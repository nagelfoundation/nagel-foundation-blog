from rest_framework import routers
from blog.viewsets import BlogViewSet, CommentViewSet

router = routers.SimpleRouter()
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'blog', BlogViewSet, basename='blog')