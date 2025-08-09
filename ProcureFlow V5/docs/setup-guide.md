# ProcureFlow V5 - Setup Guide

This guide will help you set up the ProcureFlow V5 development environment using cloud-based tools since you cannot install packages on your corporate laptop.

## 🚀 Quick Start (Cloud Development)

### Prerequisites
- GitHub account
- Supabase account (free tier available)
- Vercel account (free tier available)
- Railway account (free tier available)

## 📋 Step-by-Step Setup

### 1. GitHub Repository Setup

1. **Create a new repository** on GitHub:
   - Go to [GitHub](https://github.com)
   - Click "New repository"
   - Name it `procureflow-v5`
   - Make it private (recommended for business projects)
   - Don't initialize with README (we'll push our existing code)

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ProcureFlow V5 setup"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/procureflow-v5.git
   git push -u origin main
   ```

### 2. GitHub Codespaces Setup

1. **Open in Codespaces**:
   - Go to your repository on GitHub
   - Click the green "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main"

2. **Wait for setup**:
   - Codespaces will automatically detect the project structure
   - It will install Python and Node.js dependencies
   - This may take 2-3 minutes

### 3. Supabase Database Setup

1. **Create Supabase project**:
   - Go to [Supabase](https://supabase.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Choose your organization
   - Name: `procureflow-v5`
   - Database password: Create a strong password
   - Region: Choose closest to you
   - Click "Create new project"

2. **Get your credentials**:
   - Go to Settings → API
   - Copy your Project URL and anon/public key
   - Save these for later

3. **Set up environment variables**:
   - In your Codespace, create a `.env` file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```

   Add your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   DATABASE_URL=your_supabase_database_url
   SECRET_KEY=your_secret_key_here
   ```

### 4. Backend Setup (FastAPI)

1. **Install Python dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the development server**:
   ```bash
   python main.py
   ```

3. **Test the API**:
   - Open the Codespaces ports tab
   - Click on port 8000
   - You should see the FastAPI docs at `/docs`

### 5. Frontend Setup (React)

1. **Install Node.js dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Access the frontend**:
   - Open the Codespaces ports tab
   - Click on port 3000
   - You should see the React app

### 6. Database Schema Setup

1. **Create database tables** (we'll do this in the next phase):
   - Users table
   - Organizations (tenants) table
   - Projects table
   - Documents table
   - And more...

## 🔧 Development Workflow

### Daily Development Process

1. **Start your Codespace**:
   - Go to your GitHub repository
   - Click "Code" → "Codespaces"
   - Open your existing codespace or create a new one

2. **Make changes**:
   - Edit files in the Codespace editor
   - Backend changes auto-reload (if using `uvicorn --reload`)
   - Frontend changes auto-reload (Vite hot reload)

3. **Test your changes**:
   - Backend: Check `/docs` for API documentation
   - Frontend: Check the browser for UI changes

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

## 🌐 Deployment Setup

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Environment variables**:
   - Add your API URL in Vercel dashboard
   - Add Supabase credentials

### Backend Deployment (Railway)

1. **Connect to Railway**:
   - Go to [Railway](https://railway.app)
   - Sign up with GitHub
   - Click "New Project"
   - Deploy from GitHub repo
   - Set root directory to `backend`

2. **Environment variables**:
   - Add all your `.env` variables in Railway dashboard

## 📁 Project Structure Explained

```
ProcureFlow V5/
├── backend/                 # Python FastAPI server
│   ├── app/                # Main application code
│   │   ├── core/           # Configuration, database, auth
│   │   ├── api/            # API routes and endpoints
│   │   ├── models/         # Database models
│   │   └── services/       # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── main.py            # Server entry point
├── frontend/               # React application
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # TypeScript type definitions
│   ├── package.json       # Node.js dependencies
│   └── public/            # Static files
├── docs/                  # Documentation
├── .github/               # GitHub configuration
└── README.md             # Project overview
```

## 🔐 Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files to Git
   - Use different credentials for development and production
   - Rotate secrets regularly

2. **Database Security**:
   - Use Row Level Security (RLS) in Supabase
   - Implement proper authentication
   - Validate all inputs

3. **API Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all requests

## 🚨 Troubleshooting

### Common Issues

1. **Port not accessible**:
   - Check if the service is running
   - Verify the port number
   - Check Codespaces port forwarding

2. **Database connection issues**:
   - Verify Supabase credentials
   - Check network connectivity
   - Ensure database is active

3. **Build errors**:
   - Check dependency versions
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Getting Help

- Check the [GitHub Issues](https://github.com/your-repo/issues)
- Review the [API Documentation](http://localhost:8000/docs)
- Check the [Supabase Documentation](https://supabase.com/docs)

## 📈 Next Steps

After completing this setup:

1. **Phase 1**: Database schema and basic authentication
2. **Phase 2**: Multi-tenant architecture implementation
3. **Phase 3**: Project management features
4. **Phase 4**: Document management and workflows
5. **Phase 5**: Analytics and reporting
6. **Phase 6**: Payment integration and white-labeling

---

**Need help?** Create an issue in the GitHub repository or reach out to the development team.
