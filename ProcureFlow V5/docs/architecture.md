# ProcureFlow V5 - System Architecture

## 🏗️ Overview

ProcureFlow V5 is a multi-tenant SaaS platform designed for consulting firms to manage procurement projects for multiple clients. The architecture ensures complete data isolation between tenants while providing a scalable and maintainable codebase.

## 🎯 Core Requirements

- **Multi-tenant**: Complete data isolation between consulting firms and their clients
- **Scalable**: Handle multiple organizations and thousands of users
- **Secure**: Role-based access control and data protection
- **Configurable**: Customizable project templates and workflows
- **Cloud-native**: Built for cloud deployment and scalability

## 🏛️ Architecture Pattern

### Multi-Tenant Architecture

We use a **Database-per-Tenant** approach with **Shared Application**:

```
┌─────────────────────────────────────────────────────────────┐
│                    ProcureFlow V5 Platform                  │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)  │  Backend (FastAPI)  │  Database Layer  │
│                    │                     │                  │
│  ┌─────────────┐  │  ┌─────────────┐    │  ┌─────────────┐  │
│  │   Tenant A  │  │  │   API Layer │    │  │  Supabase   │  │
│  │   (Client)  │◄─┤  │             │◄───┤  │  PostgreSQL │  │
│  └─────────────┘  │  └─────────────┘    │  └─────────────┘  │
│                   │                     │                  │
│  ┌─────────────┐  │  ┌─────────────┐    │  ┌─────────────┐  │
│  │   Tenant B  │  │  │  Business   │    │  │ Row Level   │  │
│  │   (Client)  │◄─┤  │   Logic     │◄───┤  │ Security    │  │
│  └─────────────┘  │  └─────────────┘    │  └─────────────┘  │
│                   │                     │                  │
│  ┌─────────────┐  │  ┌─────────────┐    │  ┌─────────────┐  │
│  │   Tenant C  │  │  │  Auth &     │    │  │  Multi-     │  │
│  │   (Client)  │◄─┤  │  Security   │◄───┤  │  Tenant     │  │
│  └─────────────┘  │  └─────────────┘    │  │  Isolation  │  │
└─────────────────────────────────────────────────────────────┘
```

## 🗄️ Database Design

### Core Tables

```sql
-- Organizations (Tenants)
organizations (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  settings JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Users
users (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  role VARCHAR NOT NULL, -- admin, manager, analyst, stakeholder
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Projects
projects (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR NOT NULL, -- RFP, RFQ, Contract, Tender
  status VARCHAR DEFAULT 'draft',
  template_id UUID,
  budget DECIMAL,
  start_date DATE,
  end_date DATE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Project Templates
project_templates (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  structure JSONB, -- Template structure and fields
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Documents
documents (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- RFP, Response, Contract, etc.
  file_path VARCHAR,
  file_size INTEGER,
  mime_type VARCHAR,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Vendors
vendors (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR NOT NULL,
  email VARCHAR,
  phone VARCHAR,
  address TEXT,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Project Vendors (Many-to-Many)
project_vendors (
  project_id UUID REFERENCES projects(id),
  vendor_id UUID REFERENCES vendors(id),
  status VARCHAR DEFAULT 'invited', -- invited, responded, shortlisted, selected
  response_date TIMESTAMP,
  PRIMARY KEY (project_id, vendor_id)
)
```

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- ... etc for all tables

-- Example RLS policy for projects
CREATE POLICY "Users can only access projects in their organization"
ON projects FOR ALL
USING (
  organization_id IN (
    SELECT organization_id 
    FROM users 
    WHERE id = auth.uid()
  )
);
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **User Login**: Supabase Auth handles authentication
2. **JWT Token**: Contains user ID and organization context
3. **API Requests**: Token validated on each request
4. **Tenant Context**: Organization ID extracted from token

### Role-Based Access Control

```typescript
enum UserRole {
  ADMIN = 'admin',           // Full access to organization
  MANAGER = 'manager',       // Manage projects and team
  ANALYST = 'analyst',       // Create and edit projects
  STAKEHOLDER = 'stakeholder' // View only, limited access
}

interface Permission {
  resource: string;          // 'projects', 'users', 'documents'
  action: string;            // 'create', 'read', 'update', 'delete'
  conditions?: object;       // Additional conditions
}
```

## 🚀 API Design

### RESTful Endpoints

```
/api/v1/
├── auth/
│   ├── login
│   ├── logout
│   └── refresh
├── organizations/
│   ├── /{id}
│   ├── /{id}/settings
│   └── /{id}/users
├── projects/
│   ├── /
│   ├── /{id}
│   ├── /{id}/documents
│   └── /{id}/vendors
├── templates/
│   ├── /
│   └── /{id}
├── vendors/
│   ├── /
│   └── /{id}
└── documents/
    ├── /
    ├── /{id}
    └── /upload
```

### Request/Response Format

```typescript
// Standard API Response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated Response
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

## 🎨 Frontend Architecture

### Component Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   └── features/         # Feature-specific components
│       ├── projects/
│       ├── documents/
│       └── vendors/
├── pages/                # Page components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── types/                # TypeScript definitions
└── utils/                # Helper functions
```

### State Management

- **React Query**: Server state management
- **React Context**: Global app state
- **Local State**: Component-specific state

## 🔄 Data Flow

### Multi-Tenant Data Flow

```
1. User Login
   ↓
2. JWT Token (contains org_id)
   ↓
3. API Request with Token
   ↓
4. Backend validates token
   ↓
5. Extract organization_id
   ↓
6. Apply RLS policies
   ↓
7. Return filtered data
   ↓
8. Frontend displays tenant-specific data
```

## 🚀 Deployment Architecture

### Production Setup

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Supabase      │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
│                 │    │                 │    │                 │
│  React App      │◄──►│  FastAPI        │◄──►│  PostgreSQL     │
│  Static Files   │    │  API Server     │    │  Auth Service   │
│  CDN            │    │  Business Logic │    │  Storage        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Environment Variables

```env
# Frontend (Vercel)
VITE_API_URL=https://your-backend.railway.app
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Backend (Railway)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_key
DATABASE_URL=postgresql://...
SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

## 📈 Scalability Considerations

### Horizontal Scaling

- **Frontend**: Vercel CDN handles global distribution
- **Backend**: Railway auto-scales based on traffic
- **Database**: Supabase handles scaling automatically

### Performance Optimization

- **Caching**: React Query for API response caching
- **Lazy Loading**: Code splitting for better initial load
- **Database**: Proper indexing and query optimization
- **CDN**: Static assets served from edge locations

## 🔒 Security Measures

### Data Protection

- **Encryption**: All data encrypted at rest and in transit
- **RLS**: Row-level security for tenant isolation
- **Input Validation**: All inputs validated and sanitized
- **Rate Limiting**: API rate limiting to prevent abuse

### Authentication Security

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for password storage
- **Session Management**: Proper session handling
- **CORS**: Configured CORS policies

## 🧪 Testing Strategy

### Testing Layers

- **Unit Tests**: Individual component and function tests
- **Integration Tests**: API endpoint and database tests
- **E2E Tests**: Full user workflow tests
- **Security Tests**: Authentication and authorization tests

### Test Structure

```
tests/
├── backend/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── frontend/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── shared/
    └── test-utils/
```

## 📊 Monitoring & Logging

### Monitoring Tools

- **Application Monitoring**: Railway built-in monitoring
- **Error Tracking**: Sentry for error reporting
- **Performance**: Vercel Analytics
- **Database**: Supabase dashboard

### Logging Strategy

- **Structured Logging**: JSON format for easy parsing
- **Log Levels**: DEBUG, INFO, WARN, ERROR
- **Context**: Include tenant and user context
- **Retention**: Configure appropriate log retention

---

This architecture provides a solid foundation for a scalable, secure, and maintainable multi-tenant procurement platform.
