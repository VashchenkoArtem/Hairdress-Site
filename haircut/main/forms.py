from django import forms

class ReviewForm(forms.Form):
    name = forms.CharField(label = "Ім'я та прізвище",max_length=256, widget = forms.Textarea(attrs={
        "class": "input-form"
    }))
    phone_number = forms.CharField(label = "Номер телефону", widget = forms.Textarea(attrs={
        "class": "input-form",
        "type": "tel"
    }))
    email = forms.EmailField(label = "Пошта", widget = forms.EmailInput(attrs={
        "class": "input-form",
        "type": "email"
    }))
    photo = forms.ImageField(label = "Прикріпити фото")
    wishlist = forms.CharField(max_length = 5000, label = "Побажання до підбору")
