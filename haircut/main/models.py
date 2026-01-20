import uuid
from django.db import models

# Create your models here.
class CommentModel(models.Model):
    author_city = models.CharField(max_length=100, null = True, blank = True, default="не вказано")
    author_name = models.CharField(max_length=100, null = True, blank = True, default="Анонім")
    comment_text = models.TextField()

    def __str__(self):
        return f"{self.author_name} from {self.author_city}"
    
class OrderModel(models.Model):
    STATUS_CHOICES = (
        ('Draft', 'Чернетка'),
        ('Waiting_payment', 'Очікування оплати'),
        ('Paid', 'Сплачено'),
        ('Canceled', 'Скасовано'),
    )
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    username = models.CharField(max_length = 256, null = True)
    phone_number = models.CharField(null = True, default="+380")
    email = models.EmailField(null=True)
    wish = models.TextField(null = True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Draft")
    def __str__(self):
        return f"Замовлення {self.uuid}"

class PhotosModel(models.Model):
    order = models.ForeignKey(to=OrderModel, on_delete=models.CASCADE)
    file = models.ImageField(upload_to="orders/")