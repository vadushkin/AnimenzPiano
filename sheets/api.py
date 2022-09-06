from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Sheet, Category, Tag
from .serializers import SheetSerializer


class SheetViewSet(viewsets.ModelViewSet):
    queryset = Sheet.objects.all()
    serializer_class = SheetSerializer

    @action(methods=['get'], detail=False)
    def categories(self, request):
        categories = Category.objects.all()
        return Response({'categories': [c.name for c in categories]})

    @action(methods=['get'], detail=False)
    def tags(self, request):
        tags = Tag.objects.all()
        return Response({'tags': [t.name for t in tags]})
