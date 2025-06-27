from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create multiple test users'

    def handle(self, *args, **kwargs):
        for i in range(1, 11):  # Creates 10 users: testuser1 ... testuser10
            username = f'testuser{i}'
            email = f'testuser{i}@example.com'
            password = 'testpass123'
            if not User.objects.filter(username=username).exists():
                User.objects.create_user(username=username, email=email, password=password)
                self.stdout.write(self.style.SUCCESS(f'Created user: {username}'))
            else:
                self.stdout.write(self.style.WARNING(f'User {username} already exists')) 