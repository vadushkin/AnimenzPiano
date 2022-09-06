from django import template
from django.core.cache import cache

from sheets.models import Tag, Sheet, Category

register = template.Library()


@register.simple_tag(name='get_count_tags')
def get_count_tags():
    tags = cache.get('tags')
    if not tags:
        tags = Tag.objects.count()
        cache.set('tags', tags, 60)
    return tags


@register.simple_tag(name='get_count_archives')
def get_count_archives():
    sheets = cache.get('sheets')
    if not sheets:
        sheets = Sheet.objects.count()
        cache.set('sheets', sheets, 60)
    return sheets


@register.simple_tag(name='get_count_categories')
def get_count_categories():
    cats = cache.get('cats')
    if not cats:
        cats = Category.objects.count()
        cache.set('cats', cats, 60)
    return cats
