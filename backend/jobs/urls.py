from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobApplicationViewSet, InterviewViewSet, NoteViewSet

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'job-applications', JobApplicationViewSet, basename='jobapplication')
router.register(r'interviews', InterviewViewSet, basename='interview')
router.register(r'notes', NoteViewSet, basename='note')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('api/', include(router.urls)),
] 