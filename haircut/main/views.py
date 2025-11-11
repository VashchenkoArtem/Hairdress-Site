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
import base64
import hashlib
# Create your views here
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))
public_key = os.getenv("LIQPAY_PUBLIC_KEY")
private_key = os.getenv("LIQPAY_PRIVATE_KEY")
mono_token = os.getenv("MONO_TOKEN")


class MainPageView(FormView):
    template_name = "main/main.html"
    form_class = ReviewForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        PUBLIC_KEY = os.getenv("LIQPAY_PUBLIC_KEY")
        PRIVATE_KEY = os.getenv("LIQPAY_PRIVATE_KEY")

        payload = {
            "version": 3,
            "public_key": PUBLIC_KEY,
            "action": "pay",
            "amount": "50",
            "currency": "UAH",
            "description":"Оплата замовлення",
            "order_id": "order_1",
            "language": "uk"
        }

        data = base64.b64encode(json.dumps(payload, ensure_ascii=False).encode()).decode()
        signature = base64.b64encode(hashlib.sha1((PRIVATE_KEY + data + PRIVATE_KEY).encode()).digest()).decode()

        context["liqpay_data"] = data
        context["liqpay_signature"] = signature
        return context
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

@csrf_exempt
def webhook_for_mono(request):
    payload = json.loads(request.body)