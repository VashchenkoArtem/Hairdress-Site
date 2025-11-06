from django.http import JsonResponse
from django.views.generic import FormView
from .forms import ReviewForm
from haircut.settings import MONOBANK_TOKEN
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import HttpResponse

# Create your views here
class MainPageView(FormView):
    template_name = "main/main.html"
    form_class = ReviewForm

def create_invoice(request):
    url = "https://api.monobank.ua/api/merchant/invoice/create"
    headers = {
        "X-Token": MONOBANK_TOKEN,
        "Content-Type": "application/json"
    }
    data = {
        "amount": 5000,  # сумма в копейках (50 грн)
        "ccy": 980,      # код валюты UAH
        "merchantPaymInfo": {
            "reference": "ORDER-12345",
            "destination": "Оплата замовлення",
            "comment": "Тестова оплата"
        }
    }
    response = requests.post(url, headers=headers, json=data)
    return JsonResponse(response.json())

@csrf_exempt
def webhook_for_mono(request):
    payload = json.loads(request.body)
    return HttpResponse("Success!")