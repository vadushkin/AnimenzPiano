# Animenz Piano Sheets

#### Ссылка на код официального сайта: https://github.com/AnotiaWang/animenz

Скриншоты
---------

![img.png](images/img2.png)

![img.png](images/img3.png)

Установка
---------

```
git clone https://github.com/vadushkin/animenz_piano.git
cd animenz_piano
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Админка

```
python manage.py createsuperuser
```

Docker
------

```
git clone https://github.com/vadushkin/animenz_piano.git
cd animenz_piano
docker-compose up -d
```

### Остановка Docker
```
docker-compose stop
```

Сервис
------

* `/` - Главная страница
* `admin/` - Админка
* `about/` - О Animenz
* `donate/` - Пожертвование
* `tags/` - Теги
* `tags/<slug>/` - Тег
* `post/<slug>/` - Пост
* `archives/` - Архив всех постов
* `categories/` - Категории
* `categories/<slug>/` - Категория

API
---
* `api/v1/sheets/` - Все посты
* `api/v1/sheets/<id>/` - Пост
* `api/v1/sheets/tags/` - Теги
* `api/v1/sheets/categories/` - Категории
* `api/v1/drf-auth/` - Авторизация
