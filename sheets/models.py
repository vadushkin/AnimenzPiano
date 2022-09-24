import pypdfium2 as pdfium

from django.core.validators import FileExtensionValidator
from django.db import models


class Tag(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'
        ordering = ['name']


class Category(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']


class Sheet(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=100, unique=True)
    file = models.FileField(validators=[
        FileExtensionValidator(
            allowed_extensions=['pdf'],
            message="It isn't a pdf file"
        )
    ])
    photo = models.ImageField()
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    category = models.ForeignKey(Category, related_name='category', on_delete=models.SET_NULL, blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name="post")
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.name}'

    def save(self, *args, **kwargs):
        super(Sheet, self).save(*args, **kwargs)
        pdf = pdfium.PdfDocument(f'{self.file.path}')
        page = pdf.get_page(0)
        pil_image = page.render_topil()
        output = f'{self.file.path[:-4]}.jpg'
        pil_image.save(output)
        page.close()
        Sheet.objects.filter(pk=self.pk).update(photo=f'{self.file.path[:-4]}.jpg')

    class Meta:
        verbose_name = 'Sheet'
        verbose_name_plural = 'Sheets'
        ordering = ['name']
