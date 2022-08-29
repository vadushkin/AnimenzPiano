from django.shortcuts import render

from .models import Sheet


def home(request):
    context = {
        'sheet': Sheet.objects.all()
    }
    return render(request, 'sheets/index.html', context=context)
