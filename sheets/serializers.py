from rest_framework import serializers

from .models import Sheet


class SheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sheet
        fields = ('name', 'slug', 'description', 'url', 'file', 'category', 'tags', 'created_at', 'updated_at')
