from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator


class JobApplication(models.Model):
    """
    Model to store job application information
    """
    # Status choices for job applications
    STATUS_CHOICES = [
        ('applied', 'Applied'),
        ('interview', 'Interview'),
        ('offer', 'Offer'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn'),
    ]
    
    # User who owns this job application
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_applications')
    
    # Basic job information
    company_name = models.CharField(max_length=200, validators=[MinLengthValidator(2)])
    position_title = models.CharField(max_length=200, validators=[MinLengthValidator(2)])
    job_description = models.TextField(blank=True)
    
    # Application details
    application_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='applied')
    
    # Contact information
    contact_person = models.CharField(max_length=100, blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    
    # Salary and location
    salary_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    salary_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    
    # Job posting details
    job_url = models.URLField(blank=True)
    source = models.CharField(max_length=100, blank=True)  # e.g., LinkedIn, Indeed, Company website
    
    # Notes and additional information
    general_notes = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-application_date', '-created_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'
    
    def __str__(self):
        return f"{self.position_title} at {self.company_name}"
    
    @property
    def salary_range(self):
        """Return formatted salary range"""
        if self.salary_min and self.salary_max:
            return f"${self.salary_min:,.0f} - ${self.salary_max:,.0f}"
        elif self.salary_min:
            return f"${self.salary_min:,.0f}+"
        elif self.salary_max:
            return f"Up to ${self.salary_max:,.0f}"
        return "Not specified"


class Interview(models.Model):
    """
    Model to store interview information for job applications
    """
    INTERVIEW_TYPE_CHOICES = [
        ('phone', 'Phone'),
        ('video', 'Video'),
        ('onsite', 'On-site'),
        ('technical', 'Technical'),
        ('behavioral', 'Behavioral'),
        ('final', 'Final'),
    ]
    
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    ]
    
    # Related job application
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name='interviews')
    
    # Interview details
    interview_type = models.CharField(max_length=20, choices=INTERVIEW_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    
    # Scheduling
    scheduled_date = models.DateTimeField()
    duration_minutes = models.IntegerField(default=60)
    
    # Interviewer information
    interviewer_name = models.CharField(max_length=100, blank=True)
    interviewer_title = models.CharField(max_length=100, blank=True)
    
    # Location/Platform
    location = models.CharField(max_length=200, blank=True)  # Physical location or video platform
    meeting_link = models.URLField(blank=True)
    
    # Notes
    notes = models.TextField(blank=True)
    feedback = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['scheduled_date']
        verbose_name = 'Interview'
        verbose_name_plural = 'Interviews'
    
    def __str__(self):
        return f"{self.interview_type} interview for {self.job_application.position_title}"


class Note(models.Model):
    """
    Model to store notes for job applications
    """
    # Related job application
    job_application = models.ForeignKey(JobApplication, on_delete=models.CASCADE, related_name='notes')
    
    # Note content
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Note'
        verbose_name_plural = 'Notes'
    
    def __str__(self):
        return f"{self.title} - {self.job_application.company_name}"
