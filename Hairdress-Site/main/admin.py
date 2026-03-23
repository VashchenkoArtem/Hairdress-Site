from django.contrib import admin
from .models import CommentModel, OrderModel
# Register your models here.
admin.site.register([CommentModel, OrderModel])