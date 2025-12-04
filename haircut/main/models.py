from django.db import models

# Create your models here.
class CommentModel(models.Model):
    author_city = models.CharField(max_length=100, null = True, blank = True, default="не вказано")
    author_name = models.CharField(max_length=100, null = True, blank = True, default="Анонім")
    comment_text = models.TextField()

    def __str__(self):
        return f"{self.author_name} from {self.author_city}"