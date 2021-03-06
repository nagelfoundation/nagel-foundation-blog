from django.contrib import admin
from django.urls import path, include , re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_jwt.views import obtain_jwt_token
from routers import router



urlpatterns = [
    path('api-auth', include('rest_framework.urls')),
    path('summernote/', include('django_summernote.urls')),
    path('api/blog/', include('blog.urls')),
    path('admin/', admin.site.urls),
    path('api/', include((router.urls, 'nagel_foundation_blog'), namespace='nagel_foundation_blog')),
    path('token-auth/', obtain_jwt_token),
    path('core/', include('core.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]