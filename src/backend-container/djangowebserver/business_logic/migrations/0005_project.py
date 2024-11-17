# Generated by Django 5.1.3 on 2024-11-17 18:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('business_logic', '0004_alter_company_creator_companycustomuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, unique=True)),
                ('description', models.CharField(max_length=255)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='business_logic.company')),
            ],
            options={
                'unique_together': {('name', 'company')},
            },
        ),
    ]