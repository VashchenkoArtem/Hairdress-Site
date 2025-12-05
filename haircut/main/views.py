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
            'sandbox': 0, # sandbox mode, set to 1 to enable it
            'server_url': 'https://latonia-unvigorous-eula.ngrok-free.dev',
        }
        signature = liqpay.cnb_signature(params)
        data = liqpay.cnb_data(params)
        context['data'] = data
        context['signature'] = signature
        context["first_comment"] = CommentModel.objects.first()
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



@method_decorator(csrf_exempt, name='dispatch')
class PayCallbackView(View):
    def post(self, request, *args, **kwargs):

        liqpay = LiqPay('sandbox_i29360937099', 'sandbox_Azuio98ChlKkvhbefL03rOaxFBMytQ8d2m3t8Fvq')
        data = request.POST.get('data')
        signature = request.POST.get('signature')
        sign = liqpay.str_to_sign('sandbox_Azuio98ChlKkvhbefL03rOaxFBMytQ8d2m3t8Fvq' + data + 'sandbox_Azuio98ChlKkvhbefL03rOaxFBMytQ8d2m3t8Fvq')
        if sign == signature:
            print('callback is valid')
        response = liqpay.decode_data_from_str(data)
        print('callback data', response)
        return HttpResponse()