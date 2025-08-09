"""
Configuration settings for ProcureFlow V5
Handles environment variables and app configuration
"""

from pydantic_settings import BaseSettings
from typing import Optional, List
import os

class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Application settings
    app_name: str = "ProcureFlow V5"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Database settings (Supabase)
    supabase_url: Optional[str] = None
    supabase_key: Optional[str] = None
    database_url: Optional[str] = None
    
    # Security settings
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # CORS settings
    allowed_origins: List[str] = [
        "http://localhost:3000",  # React dev server
        "http://localhost:5173",  # Vite dev server
        "https://your-frontend-domain.vercel.app"  # Production frontend
    ]
    
    # Stripe settings
    stripe_secret_key: Optional[str] = None
    stripe_publishable_key: Optional[str] = None
    stripe_webhook_secret: Optional[str] = None
    
    # Email settings
    smtp_server: Optional[str] = None
    smtp_port: int = 587
    smtp_username: Optional[str] = None
    smtp_password: Optional[str] = None
    email_from: Optional[str] = None
    
    # File storage settings
    upload_folder: str = "uploads"
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create global settings instance
settings = Settings()

# Helper function to get database URL
def get_database_url() -> str:
    """Get database URL from environment or Supabase"""
    if settings.database_url:
        return settings.database_url
    
    if settings.supabase_url and settings.supabase_key:
        # Extract database URL from Supabase URL
        # Supabase URL format: https://project-ref.supabase.co
        # Database URL format: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
        project_ref = settings.supabase_url.split("//")[1].split(".")[0]
        return f"postgresql://postgres:[password]@db.{project_ref}.supabase.co:5432/postgres"
    
    raise ValueError("Database URL or Supabase credentials not configured")
