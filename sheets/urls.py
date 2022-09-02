from django.urls import path
from . import views

urlpatterns = [
    # main page
    path('', views.home, name='home'),

    # contact
    path('about/', views.about, name='about'),
    # path('donate/', views.donate, name='donate'),
    #
    # # content
    # path('archives/', views.archives, name='archives'),
    # path('post/<slug:name>', views.post, name='post'),
    # path('categories/uncategorized', views.uncategorized, name='uncategorized'),
    # path('tags/', views.tags, name='tags'),
    # path('tags/<slug:name>', views.tag_name, name='tag_name'),
]
