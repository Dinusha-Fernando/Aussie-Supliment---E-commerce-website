from typing import ClassVar
from django.db import models
from django.utils.text import slugify

class BlogCategory(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Blog Categories'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    objects: ClassVar[models.Manager] = models.Manager()
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, related_name='posts')
    author_name = models.CharField(max_length=100, default='Dr. Lachlan Hayes (BSc, MND, APD)')
    author_role = models.CharField(max_length=100, default='Head of Sports Science & Clinical Nutrition')
    
    excerpt = models.TextField()
    content = models.TextField(help_text="Full markdown or HTML article content")
    cover_image_url = models.URLField(max_length=500)
    read_time_minutes = models.PositiveIntegerField(default=5)
    tags = models.CharField(max_length=255, default='Nutrition, Muscle Building, Recovery')
    
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
