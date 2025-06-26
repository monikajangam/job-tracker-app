# Job Application Tracker

A full-stack web application for tracking job applications, interviews, and managing your job search process. Built with Django (backend) and React (frontend).

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Job Application Management**: Add, edit, delete, and track job applications
- **Status Tracking**: Monitor application status (Applied, Interview, Offer, Rejected, Withdrawn)
- **Interview Scheduling**: Schedule and manage interviews with calendar view
- **Notes System**: Add detailed notes for each job application
- **Dashboard Analytics**: View statistics and charts of your job search progress
- **Search Functionality**: Search through your job applications
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Backend
- **Django 5.2**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database (configurable for development/production)
- **Django CORS Headers**: Cross-origin resource sharing
- **Python Decouple**: Environment variable management

### Frontend
- **React 18**: User interface library
- **Material-UI**: Component library and styling
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Chart.js**: Data visualization
- **Date-fns**: Date manipulation

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- PostgreSQL (optional for development)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-tracker-app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

The Django backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The React frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
job-tracker-app/
├── backend/
│   ├── jobtracker/          # Django project settings
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # API serializers
│   │   ├── views.py        # API views
│   │   └── urls.py         # URL routing
│   ├── users/              # User management app
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   ├── package.json        # Node.js dependencies
│   └── public/             # Static files
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=jobtrackerdb
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### Database Configuration

For development, the app uses SQLite by default. For production, update the database settings in `backend/jobtracker/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT', default='5432'),
    }
}
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api-token-auth/` - Login and get token
- `POST /api-auth/registration/` - Register new user
- `GET /api-auth/user/` - Get current user info

### Job Applications Endpoints

- `GET /api/job-applications/` - List all job applications
- `POST /api/job-applications/` - Create new job application
- `GET /api/job-applications/{id}/` - Get specific job application
- `PUT /api/job-applications/{id}/` - Update job application
- `DELETE /api/job-applications/{id}/` - Delete job application
- `GET /api/job-applications/search/?q={query}` - Search job applications
- `GET /api/job-applications/dashboard_stats/` - Get dashboard statistics

### Interviews Endpoints

- `GET /api/interviews/` - List all interviews
- `POST /api/interviews/` - Create new interview
- `GET /api/interviews/upcoming/` - Get upcoming interviews
- `GET /api/interviews/calendar/?start={date}&end={date}` - Get interviews for calendar

### Notes Endpoints

- `GET /api/notes/` - List all notes
- `POST /api/notes/` - Create new note
- `PUT /api/notes/{id}/` - Update note
- `DELETE /api/notes/{id}/` - Delete note

## 🎯 Usage

1. **Register/Login**: Create an account or sign in
2. **Add Job Applications**: Click "Add Application" to track a new job
3. **Update Status**: Change the status as your application progresses
4. **Schedule Interviews**: Add interview details and schedule
5. **Add Notes**: Keep track of important information
6. **View Dashboard**: Monitor your job search progress

## 🚀 Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn jobtracker.wsgi:application`
5. Add environment variables

### Frontend Deployment (Netlify)

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

## 🎉 Acknowledgments

- Django and React communities
- Material-UI for the beautiful components
- All contributors and users 