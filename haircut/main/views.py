import base64
import hashlib
from django.http import JsonResponse
from django.views.generic import FormView
from .forms import ReviewForm
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse
import os
from dotenv import load_dotenv
from liqpay import LiqPay
from .models import CommentModel
from django.views.generic import TemplateView, View
from django.shortcuts import render
import uuid
from django.utils.decorators import method_decorator

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
            'sandbox': 1, # sandbox mode, set to 1 to enable it
            'server_url': 'http://127.0.0.1:8000/pay-callback/',
            'result_url': "http://127.0.0.1:8000/"
        }
        signature = liqpay.cnb_signature(params)
        data = liqpay.cnb_data(params)
        context['data'] = data
        context['signature'] = signature
        context["first_comment"] = CommentModel.objects.first()
        return context

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

    decoded_data = json.loads(base64.b64decode(data).decode())

    if decoded_data.get("status") == "success":
        order_id = decoded_data.get("order_id")
        print("create")

    return HttpResponse("OK")

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



