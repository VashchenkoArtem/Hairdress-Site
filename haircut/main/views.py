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
        "X-Token": "uE8KtHYzs04Db24eO4yncDW3LVvYJUTxfrhEkb1lYW98",
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
    return HttpResponse("Success!")