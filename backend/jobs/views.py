from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
from django.http import HttpResponse

from .models import JobApplication, Interview, Note
from .serializers import (
    JobApplicationSerializer, JobApplicationListSerializer,
    InterviewSerializer, InterviewCreateSerializer,
    NoteSerializer, NoteCreateSerializer
)


class JobApplicationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for JobApplication model
    Provides CRUD operations for job applications
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return job applications for the current user"""
        return JobApplication.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return JobApplicationListSerializer
        return JobApplicationSerializer
    
    def perform_create(self, serializer):
        """Set the user when creating a job application"""
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        """Get dashboard statistics for the user"""
        user_applications = self.get_queryset()
        
        # Status counts
        status_counts = user_applications.values('status').annotate(
            count=Count('id')
        ).order_by('status')
        
        # Recent applications (last 30 days)
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        recent_applications = user_applications.filter(
            application_date__gte=thirty_days_ago
        ).count()
        
        # Upcoming interviews
        upcoming_interviews = Interview.objects.filter(
            job_application__user=request.user,
            scheduled_date__gte=timezone.now(),
            status='scheduled'
        ).count()
        
        # Total applications
        total_applications = user_applications.count()
        
        # Applications by month (last 6 months)
        six_months_ago = timezone.now().date() - timedelta(days=180)
        monthly_applications = user_applications.filter(
            application_date__gte=six_months_ago
        ).extra(
            select={'month': "EXTRACT(month FROM application_date)"}
        ).values('month').annotate(count=Count('id')).order_by('month')
        
        return Response({
            'status_counts': status_counts,
            'recent_applications': recent_applications,
            'upcoming_interviews': upcoming_interviews,
            'total_applications': total_applications,
            'monthly_applications': monthly_applications,
        })
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search job applications"""
        query = request.query_params.get('q', '')
        if not query:
            return Response({'error': 'Query parameter "q" is required'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset().filter(
            Q(company_name__icontains=query) |
            Q(position_title__icontains=query) |
            Q(location__icontains=query) |
            Q(notes__icontains=query)
        ).distinct()
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class InterviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Interview model
    Provides CRUD operations for interviews
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return interviews for job applications owned by the current user"""
        return Interview.objects.filter(job_application__user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action in ['create', 'update', 'partial_update']:
            return InterviewCreateSerializer
        return InterviewSerializer
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming interviews"""
        queryset = self.get_queryset().filter(
            scheduled_date__gte=timezone.now(),
            status='scheduled'
        ).order_by('scheduled_date')
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def calendar(self, request):
        """Get interviews for calendar view"""
        start_date = request.query_params.get('start')
        end_date = request.query_params.get('end')
        
        queryset = self.get_queryset()
        
        if start_date and end_date:
            try:
                start = datetime.strptime(start_date, '%Y-%m-%d').date()
                end = datetime.strptime(end_date, '%Y-%m-%d').date()
                queryset = queryset.filter(
                    scheduled_date__date__range=[start, end]
                )
            except ValueError:
                return Response({'error': 'Invalid date format'}, 
                              status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class NoteViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Note model
    Provides CRUD operations for notes
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return notes for job applications owned by the current user"""
        return Note.objects.filter(job_application__user=self.request.user)
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action in ['create', 'update', 'partial_update']:
            return NoteCreateSerializer
        return NoteSerializer

def welcome(request):
    return HttpResponse('''
    <html>
    <head>
        <title>Welcome to Job Tracker</title>
        <style>
            body { font-family: 'Poppins', Arial, sans-serif; background: linear-gradient(135deg, #F6F7FB 60%, #A78BFA 100%); margin: 0; padding: 0; }
            .container { max-width: 500px; margin: 80px auto; background: #fff; border-radius: 20px; box-shadow: 0 8px 32px 0 rgba(124,58,237,0.10); padding: 40px; text-align: center; }
            h1 { color: #7C3AED; font-size: 2.5rem; margin-bottom: 16px; }
            .tabs { display: flex; justify-content: center; gap: 20px; margin: 32px 0 0 0; }
            .tab { background: linear-gradient(90deg, #7C3AED 60%, #A78BFA 100%); color: #fff; padding: 12px 32px; border-radius: 16px; text-decoration: none; font-weight: 600; font-size: 1.1rem; transition: background 0.2s; }
            .tab:hover { background: linear-gradient(90deg, #A78BFA 60%, #7C3AED 100%); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Job Tracker</h1>
            <p style="color: #555; font-size: 1.1rem;">Track your job applications, interviews, and more with ease.</p>
            <div class="tabs">
                <a class="tab" href="/admin/">Admin Login</a>
                <a class="tab" href="https://jobtracker-application.netlify.app/login">User Login</a>
                <a class="tab" href="https://jobtracker-application.netlify.app/register">Register</a>
            </div>
        </div>
    </body>
    </html>
    ''')
