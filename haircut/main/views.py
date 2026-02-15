import base64
import hashlib
from django.http import HttpRequest, JsonResponse
from django.views.generic import FormView
from .forms import ReviewForm
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse
import os
from dotenv import load_dotenv
from liqpay import LiqPay
from .models import CommentModel, OrderModel, PhotosModel
from django.views.generic import TemplateView, View
from django.core.mail import EmailMessage, EmailMultiAlternatives
from django.template.loader import render_to_string


load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))
public_key = os.getenv("LIQPAY_PUBLIC_KEY")
private_key = os.getenv("LIQPAY_PRIVATE_KEY")
mono_token = os.getenv("MONO_TOKEN")


class MainPageView(FormView):
    template_name = "main/main.html"
    form_class = ReviewForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["first_comment"] = CommentModel.objects.first()
        return context


                

@csrf_exempt
def liqpay_callback(request):
    data = request.POST.get("data")
    signature = request.POST.get("signature")
    if not data or not signature:
        return HttpResponse("Bad request", status=400)

    expected_signature = base64.b64encode(
        hashlib.sha1((private_key + data + private_key).encode()).digest()
    ).decode()
    if signature != expected_signature:
        return HttpResponse("Invalid signature", status=400)

    decoded_data = json.loads(base64.b64decode(data).decode())
    order_uuid = decoded_data.get("order_id")
    status = decoded_data.get("status")

    try:
        order = OrderModel.objects.get(uuid=order_uuid)
    except OrderModel.DoesNotExist:
        return HttpResponse("Order not found", status=404)
    print(status)
    if order.status != "paid" and status in ("success", "sandbox"):
        order.status = "paid"
        order.save()

        photos = PhotosModel.objects.filter(order_id=order.id)
        subject = f"Нове замовлення від {order.username}!"
        text_content = (
            f"Користувач {order.username} замовив консультацію.\n\n"
            f"Контактні дані користувача:\n"
            f"Номер телефону: {order.phone_number}\n"
            f"Електронна пошта: {order.email}\n"
            f"Побажання: {order.wish}"
        )
        html_content = render_to_string("main/email/email.html", {"order": order})
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content, 
            from_email="qrprojectdjangoteam2@gmail.com",
            to=["artemvaschenko83@gmail.com", order.email],
        )
        email.attach_alternative(html_content, "text/html")
        for photo in photos:
            email.attach_file(photo.file.path)
        email.send(fail_silently=False)

    return HttpResponse("OK")

@csrf_exempt
def mono_callback(request):
    data = json.loads(request.body)

    invoice_id = data.get("invoiceId")
    status = data.get("status")

    try:
        order = OrderModel.objects.get(mono_invoice_id=invoice_id)
    except OrderModel.DoesNotExist:
        return HttpResponse("Order not found", status=404)

    if order.status != "paid" and status in ("success", "sandbox"):
        order.status = "paid"
        order.save()

        photos = PhotosModel.objects.filter(order_id=order.id)
        subject = f"Нове замовлення від {order.username}!"
        text_content = (
            f"Користувач {order.username} замовив консультацію.\n\n"
            f"Контактні дані користувача:\n"
            f"Номер телефону: {order.phone_number}\n"
            f"Електронна пошта: {order.email}\n"
            f"Побажання: {order.wish}"
        )
        html_content = render_to_string("main/email/email.html", {"order": order})
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content, 
            from_email="qrprojectdjangoteam2@gmail.com",
            to=["artemvaschenko83@gmail.com", order.email],
        )
        email.attach_alternative(html_content, "text/html")
        for photo in photos:
            email.attach_file(photo.file.path)
        email.send(fail_silently=False)

    return HttpResponse("OK")

def getNextOrPrevComment(request):
    comment_id = int(request.GET.get('id'))
    direction_arrow = request.GET.get('direction')
    all_comments = len(CommentModel.objects.all())
    is_error = False
    if comment_id < all_comments and direction_arrow == 'next':
        comment = CommentModel.objects.filter(id__gt= comment_id).order_by('id').first()
    elif direction_arrow == "prev" and comment_id <= all_comments + 1:
        comment = CommentModel.objects.filter(id__lt= comment_id).order_by("-id").first()
    else: 
        comment = CommentModel.objects.first()
        is_error = True
    return JsonResponse({
        "comment_id": comment.id,
        "comment": comment.comment_text,
        "comment_author": comment.author_name,
        "comment_author_city": comment.author_city,
        "is_error": is_error,
        "all_comments": all_comments
    })

class FormPageView(FormView):
    template_name = "form/form.html"
    form_class = ReviewForm

class PayView(TemplateView):
    template_name = 'billing/pay.html'

def create_mono_invoice(order):
    url = "https://api.monobank.ua/api/merchant/invoice/create"

    headers = {
        "X-Token": mono_token,
        "Content-Type": "application/json"
    }

    payload = {
        "amount": 10000,
        "ccy": 980,
        "merchantPaymInfo": {
            "reference": str(order.uuid),
            "destination": "Оплата консультації",
            "comment": f"Замовлення {order.uuid}"
        },
        "redirectUrl": "https://latonia-unvigorous-eula.ngrok-free.dev/",
        "webHookUrl": "https://latonia-unvigorous-eula.ngrok-free.dev/pay-callback-mono/"
    }

    response = requests.post(url, headers=headers, json=payload)
    return response.json()

@csrf_exempt
def create_order(request):
    origin = "http://127.0.0.1:8000"

    if request.method == "OPTIONS":
        response = HttpResponse()
        response["Access-Control-Allow-Origin"] = origin
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, X-CSRFToken"
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    if request.method != "POST":
        response = JsonResponse({"error": "POST only"}, status=405)
        response["Access-Control-Allow-Origin"] = origin
        response["Access-Control-Allow-Credentials"] = "true"
        return response

    name = request.POST.get("name")
    email = request.POST.get("email")
    phone = request.POST.get("phone")
    wish = request.POST.get("wish")
    photos = request.FILES.getlist("photos")

    order = OrderModel.objects.create(
        username=name, email=email, phone_number=phone, wish=wish
    )
    for photo in photos:
        PhotosModel.objects.create(order=order, file=photo)
    liqpay = LiqPay('sandbox_i29360937099', 'sandbox_Azuio98ChlKkvhbefL03rOaxFBMytQ8d2m3t8Fvq')
    params = {
        'action': 'pay',
        'amount': '100',
        'currency': 'USD',
        'description': 'Payment for clothes',
        'order_id': str(order.uuid),
        'version': '3',
        'sandbox': 1,
        'server_url': 'https://latonia-unvigorous-eula.ngrok-free.dev/pay-callback/',
        'result_url': "https://latonia-unvigorous-eula.ngrok-free.dev/"
    }
    # Mono
    mono_response = create_mono_invoice(order)
    order.mono_invoice_id = mono_response["invoiceId"]
    order.save()
    response = JsonResponse({
        "status": "success",
        "order_uuid": str(order.uuid),
        "mono": {
            "payment_url": mono_response["pageUrl"]
        },
        "liqpay": {
            "data": liqpay.cnb_data(params),
            "signature": liqpay.cnb_signature(params),
        }
    })
    return response