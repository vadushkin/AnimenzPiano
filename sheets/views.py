from django.http import HttpResponse
from django.shortcuts import render

from .models import Sheet


def home(request):
    context = {
        'sheets': Sheet.objects.all(),
        'title': 'Animenz 曲谱',
        'name_page': 'home',
    }
    return render(request, 'sheets/index.html', context=context)


def about(request):
    context = {
        'title': 'About',
        'name_page': 'about',
    }
    return render(request, 'sheets/about.html', context=context)


def donate(request):
    context = {
        'title': 'Donate',
        'name_page': 'donate',
    }
    return render(request, 'sheets/donate.html', context=context)


def post(request, name):
    context = {
        'title': name,
    }
    return HttpResponse(name)
