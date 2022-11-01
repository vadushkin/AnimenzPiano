# Animenz Piano Sheets

#### Link to the code of the official website: https://github.com/AnotiaWang/animenz

Screenshots
---------

![img.png](images/img2.png)

![img.png](images/img3.png)

Installation
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

### Admin Panel

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

### Stop Docker
```
docker-compose stop
```

Servic
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

Api
---

* `api/v1/sheets/` - Все посты
* `api/v1/sheets/<id>/` - Пост
* `api/v1/sheets/tags/` - Теги
* `api/v1/sheets/categories/` - Категории
* `api/v1/drf-auth/` - Авторизация
