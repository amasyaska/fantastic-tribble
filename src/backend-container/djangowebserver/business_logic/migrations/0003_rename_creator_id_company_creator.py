# Generated by Django 5.1.3 on 2024-11-17 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0002_alter_company_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='creator_id',
            new_name='creator',
        ),
    ]
