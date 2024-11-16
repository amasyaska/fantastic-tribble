from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy

class CustomUserManager(BaseUserManager):

    def create_user(self, username, email, first_name, last_name, password, **extra_fields):
        if (not username):
            raise ValueError(gettext_lazy('Username is required'))
        if (not email):
            raise ValueError(gettext_lazy('Email is required'))
        else:
            email = self.normalize_email(email)
            try:
                validate_email(email)
            except ValidationError:
                raise ValueError(gettext_lazy('Email is invalid'))
        if (not first_name):
            raise ValueError(gettext_lazy('First name is required'))
        if (not last_name):
            raise ValueError(gettext_lazy('Last name is required'))
        
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    

    def create_superuser(self, username, email, first_name, last_name, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(gettext_lazy("Super user must have is_staff=True"))

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(gettext_lazy("Super user must have is_superuser=True"))
        
        user = self.create_user(username=username, email=email, first_name=first_name, last_name=last_name, password=password, extra_fields=extra_fields)
        user.save(using=self._db)

        return user