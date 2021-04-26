from rest_framework import viewsets, permissions
from blog.models import BlogPost, Comment
from blog.serializers import BlogPostSerializer, CommentSerializer

class BlogViewSet(viewsets.ModelViewSet):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return Comment.objects.all()