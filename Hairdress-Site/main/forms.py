from django import forms


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultipleFileField(forms.ImageField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        if isinstance(data, (list, tuple)):
            return [super().clean(d, initial) for d in data]
        return super().clean(data, initial)

class ReviewForm(forms.Form):
    name = forms.CharField(label = "",max_length=256, widget = forms.TextInput(attrs={
        "class": "input-form-laptop input",
        "placeholder": "Ім'я та прізвище",
        "id": "inputName"
    }))
    phone_number = forms.CharField(label = "",widget = forms.NumberInput(attrs={
        "class": "input-form-laptop input",
        "type": "tel",
        "placeholder": "Номер телефону",
        "value": "+380 ",
        "id": "inputPhone"
    }))
    email = forms.EmailField(label = "", widget = forms.EmailInput(attrs={
        "class": "input-form-laptop input",
        "type": "email",
        "placeholder": "Пошта",
        "id": "inputEmail"
    }))
    photo = MultipleFileField(label="", required=True)
    wishlist = forms.CharField(label = "",max_length = 5000, widget = forms.Textarea(attrs = {
        "placeholder": "Побажання до підбору",
        "class": "input-form-laptop input",
        "id": "inputWishlist"
    }))
