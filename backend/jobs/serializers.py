from rest_framework import serializers
from .models import JobApplication, Interview, Note
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class NoteSerializer(serializers.ModelSerializer):
    """Serializer for Note model"""
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class InterviewSerializer(serializers.ModelSerializer):
    """Serializer for Interview model"""
    class Meta:
        model = Interview
        fields = [
            'id', 'interview_type', 'status', 'scheduled_date', 'duration_minutes',
            'interviewer_name', 'interviewer_title', 'location', 'meeting_link',
            'notes', 'feedback', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    """Serializer for JobApplication model"""
    user = UserSerializer(read_only=True)
    interviews = InterviewSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)
    salary_range = serializers.ReadOnlyField()
    
    class Meta:
        model = JobApplication
        fields = [
            'id', 'user', 'company_name', 'position_title', 'job_description',
            'application_date', 'status', 'contact_person', 'contact_email',
            'contact_phone', 'salary_min', 'salary_max', 'salary_range',
            'location', 'job_url', 'source', 'general_notes', 'notes', 'interviews',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        """Override create to automatically set the user"""
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class JobApplicationListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing job applications"""
    salary_range = serializers.ReadOnlyField()
    interview_count = serializers.SerializerMethodField()
    note_count = serializers.SerializerMethodField()
    
    class Meta:
        model = JobApplication
        fields = [
            'id', 'company_name', 'position_title', 'application_date',
            'status', 'location', 'salary_range', 'interview_count',
            'note_count', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_interview_count(self, obj):
        """Get the number of interviews for this job application"""
        return obj.interviews.count()
    
    def get_note_count(self, obj):
        """Get the number of notes for this job application"""
        return obj.notes.count()


class InterviewCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating interviews"""
    class Meta:
        model = Interview
        fields = [
            'job_application', 'interview_type', 'status', 'scheduled_date',
            'duration_minutes', 'interviewer_name', 'interviewer_title',
            'location', 'meeting_link', 'notes'
        ]
    
    def validate_job_application(self, value):
        """Ensure the job application belongs to the current user"""
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("You can only create interviews for your own job applications.")
        return value


class NoteCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating notes"""
    class Meta:
        model = Note
        fields = ['job_application', 'title', 'content']
    
    def validate_job_application(self, value):
        """Ensure the job application belongs to the current user"""
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("You can only create notes for your own job applications.")
        return value 