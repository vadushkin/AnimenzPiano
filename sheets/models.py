import pypdfium2 as pdfium
from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Sheet(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=100, unique=True)
    file = models.FileField()
    photo = models.ImageField()
    description = models.TextField(blank=True)
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
