# 🚀 Deployment Guide - Job Application Tracker

This guide will walk you through deploying your Job Application Tracker to production.

## 📋 Prerequisites

- GitHub account
- Neon account (for database)
- Render account (for backend)
- Netlify account (for frontend)

---

## Step 1: Set Up Cloud Database (Neon)

### 1.1 Create Neon Account
1. Go to [Neon](https://neon.tech/)
2. Sign up with GitHub or email
3. Create a new project:
   - **Project Name**: `jobtracker-db`
   - **Region**: Choose closest to you
   - Click "Create Project"

### 1.2 Get Database Credentials
1. Click on your project
2. Copy the connection string (looks like: `postgres://username:password@hostname:port/databasename`)
3. **Save this for later** - you'll need it for Render deployment

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [Render](https://render.com/)
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### 2.2 Connect Repository
1. Connect your GitHub repository
2. Select the repository containing your Job Tracker app
3. Choose the branch (usually `main`)

### 2.3 Configure Web Service
- **Name**: `jobtracker-backend` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `cd backend && pip install -r requirements.txt && python manage.py collectstatic --no-input && python manage.py migrate`
- **Start Command**: `cd backend && gunicorn jobtracker.wsgi:application`

### 2.4 Set Environment Variables
Click "Environment" and add these variables:

```
SECRET_KEY=your-super-secret-key-here-make-it-long-and-random
DEBUG=False
DB_NAME=your-neon-database-name
DB_USER=your-neon-username
DB_PASSWORD=your-neon-password
DB_HOST=your-neon-host
DB_PORT=5432
```

**Get these values from your Neon connection string:**
- `postgres://username:password@hostname:port/databasename`
- `DB_NAME` = databasename
- `DB_USER` = username
- `DB_PASSWORD` = password
- `DB_HOST` = hostname
- `DB_PORT` = port (usually 5432)

### 2.5 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. **Copy your Render URL** (e.g., `https://your-app.onrender.com`)

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
1. Go to [Netlify](https://netlify.com/)
2. Sign up with GitHub
3. Click "New site from Git"

### 3.2 Connect Repository
1. Choose GitHub
2. Select your repository
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

### 3.3 Set Environment Variables
1. Go to Site settings → Environment variables
2. Add:
   ```
   REACT_APP_BACKEND_URL=https://your-render-url.onrender.com
   ```
   (Replace with your actual Render URL)

### 3.4 Deploy
1. Click "Deploy site"
2. Wait for deployment to complete
3. **Copy your Netlify URL** (e.g., `https://your-app.netlify.app`)

---

## Step 4: Update CORS Settings

### 4.1 Update Backend CORS
1. Go to your Render dashboard
2. Find your web service
3. Go to Environment variables
4. Add:
   ```
   CORS_ALLOWED_ORIGINS=https://your-netlify-url.netlify.app
   ```

### 4.2 Update Django Settings (if needed)
If you need to manually update CORS settings, modify `backend/jobtracker/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-app.netlify.app",
]
```

---

## Step 5: Test Your Deployment

### 5.1 Test Backend
1. Visit your Render URL
2. You should see Django's default page or API endpoints
3. Test API: `https://your-render-url.onrender.com/api/job-applications/`

### 5.2 Test Frontend
1. Visit your Netlify URL
2. Try to register/login
3. Test the application functionality

### 5.3 Create Admin User
1. Go to your Render dashboard
2. Open the shell/console
3. Run:
   ```bash
   cd backend
   python manage.py createsuperuser
   ```

---

## Step 6: Custom Domain (Optional)

### 6.1 Backend Custom Domain
1. In Render, go to your web service
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS

### 6.2 Frontend Custom Domain
1. In Netlify, go to "Domain settings"
2. Add custom domain
3. Configure DNS records

---

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Check your Neon credentials
- Verify environment variables in Render
- Test connection string locally

**2. CORS Errors**
- Update CORS_ALLOWED_ORIGINS in Render
- Check frontend backend URL configuration
- Verify HTTPS URLs

**3. Build Failures**
- Check build logs in Render/Netlify
- Verify all dependencies are in requirements.txt
- Test build locally first

**4. Static Files Not Loading**
- Ensure whitenoise is in requirements.txt
- Check STATIC_ROOT configuration
- Verify collectstatic ran successfully

### Debug Commands

**Render Shell Access:**
```bash
# Access Render shell
cd backend
python manage.py shell
python manage.py check
```

**Local Testing:**
```bash
# Test with production settings
cd backend
python manage.py runserver --settings=jobtracker.settings
```

---

## 📊 Monitoring

### Render Monitoring
- View logs in Render dashboard
- Set up alerts for downtime
- Monitor resource usage

### Netlify Monitoring
- Check build status
- View deployment logs
- Monitor site performance

---

## 🔄 Continuous Deployment

Both Render and Netlify will automatically redeploy when you push to your main branch.

### Workflow:
1. Make changes locally
2. Test locally
3. Commit and push to GitHub
4. Automatic deployment to production

---

## 🎉 Success!

Your Job Application Tracker is now live at:
- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-app.onrender.com`

### Next Steps:
1. Share your live app with potential employers
2. Add it to your portfolio
3. Continue developing new features
4. Monitor and maintain the application

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Render and Netlify documentation
3. Check your application logs
4. Test locally to isolate issues

**Happy deploying! 🚀** 