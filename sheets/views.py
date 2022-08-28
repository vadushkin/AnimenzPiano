from django.shortcuts import render


def home(request):
    return render(request, 'sheets/index.html')
