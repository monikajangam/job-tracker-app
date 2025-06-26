from django.contrib import admin
from .models import JobApplication, Interview, Note


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    """Admin interface for JobApplication model"""
    list_display = ['position_title', 'company_name', 'status', 'application_date', 'user']
    list_filter = ['status', 'application_date', 'user']
    search_fields = ['position_title', 'company_name', 'location']
    date_hierarchy = 'application_date'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'company_name', 'position_title', 'job_description')
        }),
        ('Application Details', {
            'fields': ('application_date', 'status', 'source', 'job_url')
        }),
        ('Contact Information', {
            'fields': ('contact_person', 'contact_email', 'contact_phone')
        }),
        ('Salary & Location', {
            'fields': ('salary_min', 'salary_max', 'location')
        }),
        ('Notes', {
            'fields': ('general_notes',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    """Admin interface for Interview model"""
    list_display = ['job_application', 'interview_type', 'status', 'scheduled_date', 'interviewer_name']
    list_filter = ['interview_type', 'status', 'scheduled_date']
    search_fields = ['job_application__position_title', 'job_application__company_name', 'interviewer_name']
    date_hierarchy = 'scheduled_date'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Interview Details', {
            'fields': ('job_application', 'interview_type', 'status')
        }),
        ('Scheduling', {
            'fields': ('scheduled_date', 'duration_minutes')
        }),
        ('Interviewer Information', {
            'fields': ('interviewer_name', 'interviewer_title')
        }),
        ('Location/Platform', {
            'fields': ('location', 'meeting_link')
        }),
        ('Notes & Feedback', {
            'fields': ('notes', 'feedback')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    """Admin interface for Note model"""
    list_display = ['title', 'job_application', 'created_at']
    list_filter = ['created_at']
    search_fields = ['title', 'content', 'job_application__position_title', 'job_application__company_name']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Note Information', {
            'fields': ('job_application', 'title', 'content')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
