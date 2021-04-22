from rest_framework import routers
from blog.viewsets import CommentViewSet

router = routers.SimpleRouter()
router.register(r'comment', CommentViewSet, basename='comment')
