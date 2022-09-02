from django.shortcuts import render

from .models import Sheet


def home(request):
    context = {
        'sheet': Sheet.objects.all(),
        'title': 'Animenz 曲谱',
    }
    return render(request, 'sheets/index.html', context=context)


def about(request):
    context = {
        'title': 'About',
    }
    return render(request, 'sheets/about.html', context=context)
