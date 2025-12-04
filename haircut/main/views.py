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
from .models import CommentModel
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
        context["first_comment"] = CommentModel.objects.first()
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

def getNextOrPrevComment(request):
    comment_id = int(request.GET.get('id'))
    direction_arrow = request.GET.get('direction')
    all_comments = len(CommentModel.objects.all())
    is_error = False
    print(comment_id)
    if comment_id < all_comments:
        if direction_arrow == "next":
            comment = CommentModel.objects.filter(id__gt= comment_id).order_by('id').first()
        else: 
            comment = CommentModel.objects.first()
            is_error = True
            print("first")
    if direction_arrow == "prev" and comment_id <= all_comments + 1:
        comment = CommentModel.objects.filter(id__lt= comment_id).order_by("-id").first()
    else: 
        comment = CommentModel.objects.first()
        is_error = True
        print("else last")
    return JsonResponse({
        "comment_id": comment.id,
        "comment": comment.comment_text,
        "comment_author": comment.author_name,
        "comment_author_city": comment.author_city,
        "is_error": is_error,
        "all_comments": all_comments
    })