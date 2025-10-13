from django import forms

class ReviewForm(forms.Form):
    name = forms.CharField(label = "",max_length=256, widget = forms.Textarea(attrs={
        "class": "input-form",
        "placeholder": "Ім'я та прізвище"
    }))
    phone_number = forms.CharField(label = "",widget = forms.Textarea(attrs={
        "class": "input-form",
        "type": "tel",
        "placeholder": "Номер телефону"
    }))
    email = forms.EmailField(label = "", widget = forms.EmailInput(attrs={
        "class": "input-form",
        "type": "email",
        "placeholder": "Пошта"
    }))
    photo = forms.ImageField(label = "")
    wishlist = forms.CharField(label = "",max_length = 5000, widget = forms.Textarea(attrs = {
        "placeholder": "Побажання до підбору"
    }))
