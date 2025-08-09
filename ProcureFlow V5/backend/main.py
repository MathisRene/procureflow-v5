"""
ProcureFlow V5 - FastAPI Backend
Multi-tenant Source-to-Contract Platform
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager

# Import our modules (we'll create these next)
# from app.core.config import settings
# from app.api.v1.api import api_router
# from app.core.database import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting ProcureFlow V5 Backend...")
    # await init_db()
    
    yield
    
    # Shutdown
    print("🛑 Shutting down ProcureFlow V5 Backend...")

# Create FastAPI app
app = FastAPI(
    title="ProcureFlow V5 API",
    description="Multi-tenant Source-to-Contract Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your React frontend to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes (we'll create these next)
# app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    """Root endpoint - health check"""
    return {
        "message": "Welcome to ProcureFlow V5 API",
        "version": "1.0.0",
        "status": "healthy"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "ProcureFlow V5 Backend",
        "database": "connected"  # We'll add real DB check later
    }

@app.get("/api/status")
async def api_status():
    """API status endpoint"""
    return {
        "api_version": "v1",
        "status": "operational",
        "features": {
            "multi_tenant": True,
            "authentication": True,
            "project_management": True,
            "document_management": True
        }
    }

if __name__ == "__main__":
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )
