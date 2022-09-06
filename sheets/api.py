from rest_framework import generics

from .models import Sheet
from .serializers import SheetSerializer


class SheetAPIView(generics.ListAPIView):
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer
