from django.urls import path

from . import views

urlpatterns = [
    # main page
    path('', views.SheetsHome.as_view(), name='home'),

    # contact
    path('about/', views.about, name='about'),
    path('donate/', views.donate, name='donate'),

    # content
    path('archives/', views.ArchivesView.as_view(), name='archives'),
    path('post/<slug:slug>/', views.PostView.as_view(), name='post'),
    path('categories/uncategorized/', views.CategoriesView.as_view(), name='uncategorized'),
    path('tags/', views.TagsView.as_view(), name='tags'),
    path('tags/<slug:slug>/', views.TagNameView.as_view(), name='tag_name'),
]
