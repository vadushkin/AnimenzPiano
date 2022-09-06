from rest_framework import serializers

from .models import Sheet


class SheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sheet
        fields = "__all__"
