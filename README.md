<div align="center">

# Haircut

</div>

![Static Badge](https://img.shields.io/badge/github-grey?style=for-the-badge&logo=github)
![Static Badge](https://img.shields.io/badge/Python-3.12.3-blue?style=for-the-badge&logo=python)
![Static Badge](https://img.shields.io/badge/Javascript-yellowgreen?style=for-the-badge&logo=javascript)
![Static Badge](https://img.shields.io/badge/HTML-white?style=for-the-badge&logo=html5)
![Static Badge](https://img.shields.io/badge/CSS-white?style=for-the-badge&logo=css&logoColor=blue)
![Static Badge](https://img.shields.io/badge/django-success?style=for-the-badge&logo=django)
![Static Badge](https://img.shields.io/badge/liqpay-brightgreen?style=for-the-badge&logo=base)![Static Badge](https://img.shields.io/badge/monobank-black?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/sqlite3-green?style=for-the-badge&logo=base)
![Static Badge](https://img.shields.io/badge/jquery-4.0.0-white?style=for-the-badge&logo=jquery)

### Haircut - site that helps users choose the perfect hairstyle for their hair type and lifestyle. Website for getting to know the company <a href = "https://www.instagram.com/hairnool?igsh=MXhqejZwY3d1bWdjcw==">HairNool</a>.

## Navigation

## On this site you can:

- Get to know the capabilities of HairNool.
- The ability to choose a hairstyle after consultation by filling out the form.
- Pay for the service via LiqPay or Monobank.
- View the master's past works
- View comments about others' consultations

## Links
<a href = "https://www.figma.com/design/mlNwK4DzpUlm5OcFR6r59r/%D0%9F%D1%96%D0%B4%D0%B1%D1%96%D1%80-%D1%84%D0%B0%D1%80%D0%B1%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F?node-id=100-26&p=f&t=wiYsqKADqVkQRQ06-0">Link to figma</a>

<a href = "https://www.figma.com/design/PhzVvsziiuNtQBDKaoxWGX/Untitled?node-id=0-1&p=f&t=194nVrwQLp7AZedY-0">Link to figma with popups</a>

## How to install and run the project?
<details>
    <summary>
        <img src="https://img.icons8.com/color/24/000000/windows-10.png" width="15"/>
        Windows
    </summary>

1. Create an empty folder and clone repository into:
```bash
git clone https://github.com/VashchenkoArtem/Hairdress-Site
cd Hairuct-Site
```
2. Create and activate virtual env
```python
python -m venv venv_name
.\venv_name\Scripts\activate.bat
```
3. Install all required libraries from *requirements.txt*:
```python
pip install -r requirements.txt
pip install pillow
```
4. Carrying out migrations
```python
python manage.py makemigrations
python manage.py migrate
```
5. Run server
```python
python manage.py runserver
```
Congratulations! You have installed project successful!
</details>
<details>
    <summary>
        <img src="https://img.icons8.com/color/24/mac-os.png" width="15"/>
        <img src="https://img.icons8.com/color/24/linux.png" width="15"/>
        Linux / macOS
    </summary>

1. Create an empty folder and clone repository into:
```bash
git clone https://github.com/VashchenkoArtem/Hairdress-Site
cd Hairdress-Site
```
2. Create and activate virtual env
```python
python3 -m venv venv_name
source venv_name/bin/activate
```
3. Install all required libraries from requirements.txt
```python
pip3 install -r requirements.txt
pip3 install pillow
```
4. Apply migrations
```python
python3 manage.py makemigrations
python3 manage.py migrate
```
5. Run server 
```python
python3 manage.py runserver
```
Congratulations! You have installed project successful!
</details>