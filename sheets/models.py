from django.db import models


class Sheets(models.Model):
    name = models.CharField(max_length=255)
