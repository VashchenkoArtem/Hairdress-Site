from django.shortcuts import render
from django.views.generic import FormView
from .forms import ReviewForm

# Create your views here
class MainPageView(FormView):
    template_name = "main/main.html"
    form_class = ReviewForm