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
from django.shortcuts import redirect, render
import uuid
from django.utils.decorators import method_decorator
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
        liqpay = LiqPay('sandbox_i29360937099', 'sandbox_Azuio98ChlKkvhbefL03rOaxFBMytQ8d2m3t8Fvq')
        params = {
            'action': 'pay',
            'amount': '100',
            'currency': 'USD',
            'description': 'Payment for clothes',
            'order_id': str(uuid.uuid4()),
            'version': '3',
            'sandbox': 1,
            'server_url': 'https://latonia-unvigorous-eula.ngrok-free.dev/pay-callback/',
            'result_url': "https://latonia-unvigorous-eula.ngrok-free.dev/?status=success"
        }
        signature = liqpay.cnb_signature(params)
        data = liqpay.cnb_data(params)
        if self.request.COOKIES.get("order_id"):
            context['order'] = OrderModel.objects.get(id = self.request.COOKIES.get("order_id"))
        context['data'] = data
        context['signature'] = signature
        context["first_comment"] = CommentModel.objects.first()
        return context
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        order_id = request.COOKIES.get("order_id")


        if order_id:
            order = OrderModel.objects.get(id=order_id)
            order.isPayload = True
            order.save()

            photos = PhotosModel.objects.filter(order_id=order_id)
            subject = f"Нове замовлення від {order.username}!"
            text_content = (
                f"Користувач {order.username} замовив консультацію.\n\n"
                f"Контактні дані користувача:\n"
                f"Номер телефону: {order.phone_number}\n"
                f"Електронна пошта: {order.email}\n"
                f"Побажання: {order.wish}"
            )
            html_content = render_to_string(
                "main/email/email.html",
                {
                    "order": order
                }
            )
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content, 
                from_email="qrprojectdjangoteam2@gmail.com",
                to=[order.email],
            )
            email.attach_alternative(html_content, "text/html")
            for photo in photos:
                email.attach_file(photo.file.path)
            email.send(fail_silently=False)
            response.delete_cookie("order_id")

        return super().get(request, *args, **kwargs)

                

@csrf_exempt
def liqpay_callback(request):
    data = request.POST.get("data")
    signature = request.POST.get("signature")
    expected_signature = base64.b64encode(
        hashlib.sha1(
            (private_key + data + private_key).encode()
        ).digest()
    ).decode()

    if signature != expected_signature:
        return HttpResponse("Invalid signature", status=400)
    response = HttpResponse("OK")
    decoded_data = json.loads(base64.b64decode(data).decode())
    return response

def create_invoice(request):
    url = "https://api.monobank.ua/api/merchant/invoice/create"
    headers = {
        "X-Token": os.getenv("MONO_TOKEN"),
        "Content-Type": "application/json"
    }
    data = {
        "amount": 5000,
        "ccy": 980,
        "merchantPaymInfo": {
            "reference": "ORDER-12345",
            "destination": "Оплата замовлення",
            "comment": "Оплата консультації"
        }
    }
    response = requests.post(url, headers=headers, json=data)
    return JsonResponse(response.json())


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

    response = JsonResponse({"orderId": order.id})
    response["Access-Control-Allow-Origin"] = origin
    response["Access-Control-Allow-Credentials"] = "true"

    return response