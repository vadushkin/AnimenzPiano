from django.contrib import admin
from django.utils.safestring import mark_safe

from . import models


class SheetAdminModel(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'slug', 'url', 'category', 'description', 'file', 'get_photo', 'created_at', 'updated_at')
    list_display_links = ('id', 'name')
    list_filter = ('name',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',), }
    fields = ('name',
              'slug',
              'description',
              'file',
              'get_photo',
              'url',
              'category',
              'tags',
              'created_at',
              'updated_at',
              )
    readonly_fields = ('get_photo', 'created_at', 'updated_at')

    def get_photo(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" width="100">')
        else:
            return 'Фото нет'


class TagAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',), }


class CategoryAdminModel(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',), }


admin.site.register(models.Sheet, SheetAdminModel)
admin.site.register(models.Tag, TagAdminModel)
admin.site.register(models.Category, CategoryAdminModel)
