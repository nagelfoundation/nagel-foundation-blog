from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.TextChoices):
    MUSIC = 'music'
    TECHNOLOGY = 'technology'
    REVIEWS = 'reviews'

class BlogPost(models.Model):
    title = models.CharField(max_length=75)
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.MUSIC)
    thumbnail = models.ImageField(upload_to='photos/%y/%m/%d')
    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title)
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

        count= 1
        slug = original_slug
        while(queryset):
            slug = original_slug + '-' + str(count)
            count += 1
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try: 
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title

class Comment(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    title = models.CharField(max_length=50)
    user = models.CharField(max_length=75)
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField()
    
    def __str__(self):
        return self.title
