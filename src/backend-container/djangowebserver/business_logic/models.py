from django.db import models
from accounts.models import CustomUser

class Company(models.Model):

    id = models.BigAutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=255)
    creator_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)