from django.db.models import Count
from django.shortcuts import render
from django.views.generic import ListView, DetailView

from .models import Sheet, Tag, Category


class SheetsHome(ListView):
    model = Sheet
    template_name = 'sheets/index.html'
    context_object_name = 'sheets'
    allow_empty = False
    paginate_by = 15

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Animenz 曲谱'
        context['name_page'] = 'home'
        return context

    def get_queryset(self):
        return Sheet.objects.order_by('-created_at')


class PostView(DetailView):
    model = Sheet
    template_name = 'sheets/post.html'
    context_object_name = 'sheet'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = kwargs['object']
        context['next_page'] = Sheet.objects.filter(id=kwargs['object'].id + 1)
        context['previous_page'] = Sheet.objects.filter(pk=kwargs['object'].id - 1)
        return context


class TagsView(ListView):
    model = Tag
    template_name = 'sheets/tags.html'
    context_object_name = 'tags'
    allow_empty = False

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = '标签 - Animenz 曲谱'
        context['name_page'] = 'tags'
        return context


class TagNameView(ListView):
    model = Sheet
    template_name = 'sheets/posts_by_tag.html'
    context_object_name = 'sheets'
    paginate_by = 15

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = '标签 - Animenz 曲谱'
        context['name_page'] = 'tags'
        context['tags_slug'] = self.kwargs.get('slug')
        context['tags_name'] = Tag.objects.filter(slug=self.kwargs.get('slug')).only('name')
        return context

    def get_queryset(self):
        return Sheet.objects.filter(tags__slug=self.kwargs['slug']).order_by('-created_at')


class ArchivesView(ListView):
    model = Sheet
    template_name = 'sheets/index.html'
    context_object_name = 'sheets'
    allow_empty = False
    paginate_by = 15

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Animenz 曲谱'
        context['name_page'] = 'home'
        return context


class CategoriesView(ListView):
    model = Category
    template_name = 'sheets/categories.html'
    context_object_name = 'categories'
    allow_empty = False

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = '分类 - Animenz 曲谱'
        context['name_page'] = 'categories'
        context['list_count'] = Category.objects.annotate(cnt=Count('category')).filter(cnt__gt=0)
        return context


class CategoryNameView(ListView):
    model = Sheet
    template_name = 'sheets/category.html'
    context_object_name = 'sheets'
    allow_empty = False
    paginate_by = 15

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Animenz 曲谱'
        context['name_page'] = 'categories'
        context['category_slug'] = self.kwargs.get('slug')
        context['list_count'] = Category.objects.annotate(cnt=Count('category')).filter(slug=self.kwargs.get('slug'))
        return context

    def get_queryset(self):
        return Sheet.objects.filter(category__slug=self.kwargs.get('slug')).order_by('-created_at')


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
