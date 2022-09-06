from django.urls import path, include
from django.views.decorators.cache import cache_page
from rest_framework import routers

from . import views
from .api import SheetViewSet

router = routers.SimpleRouter()

router.register(r'sheets', SheetViewSet)

urlpatterns = [
    # main page
    path('', views.SheetsHome.as_view(), name='home'),

    # contact
    path('about/', cache_page(600)(views.about), name='about'),
    path('donate/', cache_page(600)(views.donate), name='donate'),

    # content
    path('archives/', views.ArchivesView.as_view(), name='archives'),
    path('post/<slug:slug>/', views.PostView.as_view(), name='post'),
    path('categories/', views.CategoriesView.as_view(), name='categories'),
    path('categories/<slug:slug>/', views.CategoryNameView.as_view(), name='category'),
    path('tags/', views.TagsView.as_view(), name='tags'),
    path('tags/<slug:slug>/', views.TagNameView.as_view(), name='tag_name'),

    # api
    path('api/v1/', include(router.urls)),
]
