from rest_framework import serializers
from apps.blog.models import BlogCategory, BlogPost

class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogCategory
        fields = ('id', 'name', 'slug', 'description', 'post_count')

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = BlogPost
        fields = (
            'id', 'title', 'slug', 'category', 'category_name', 'category_slug', 'author_name',
            'author_role', 'excerpt', 'cover_image_url', 'read_time_minutes',
            'tags', 'is_featured', 'is_published', 'created_at'
        )


class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    related_posts = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'

    def get_related_posts(self, obj):
        posts = BlogPost.objects.filter(category=obj.category, is_published=True).exclude(id=obj.id)[:3]
        return BlogPostListSerializer(posts, many=True).data


class BlogPostAdminWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
