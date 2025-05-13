from django.db import models

# Create your models here.


class Chat(models.Model):
    name = models.CharField(max_length=255)
    message = models.CharField(max_length=600)
    created_at = models.DateTimeField()

    def __str__(self):
        return self.name
