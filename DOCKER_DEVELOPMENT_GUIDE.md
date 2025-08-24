# 🐳 ChatCluster Docker Development Guide

## Overview
This guide documents the Docker development setup for ChatCluster, including npm scripts, development helper tools, and monitoring solutions for local development.

## 📋 Table of Contents
- [Port Configuration](#port-configuration)
- [NPM Scripts](#npm-scripts)
- [Development Helper Script](#development-helper-script)
- [Environment Configuration](#environment-configuration)
- [Monitoring and Debugging](#monitoring-and-debugging)
- [Common Workflows](#common-workflows)
- [Troubleshooting](#troubleshooting)

## 🔌 Port Configuration

### New Port Assignment
To reduce confusion, ports have been reorganized:

| Service | Port | Description |
|---------|------|-------------|
| Frontend (Nginx) | 3000 | User-facing web interface |
| Backend (Express) | 5000 | API server |
| MongoDB | 27017 | Database server |

### Request Flow
```
User Browser → http://localhost:3000
     ↓
Nginx (Frontend Container) → http://chat-backend:5000
     ↓  
Express Backend → mongodb://mongo:27017/chat-app
```

## 📦 NPM Scripts

### New Docker Commands Added

```json
{
  "docker:up": "docker-compose up -d",
  "docker:up:build": "docker-compose up --build -d", 
  "docker:down": "docker-compose down",
  "docker:down:clean": "docker-compose down -v",
  "docker:restart": "docker-compose restart",
  "docker:logs": "docker-compose logs -f",
  "docker:logs:backend": "docker-compose logs -f chat-backend",
  "docker:logs:frontend": "docker-compose logs -f chat-frontend", 
  "docker:logs:mongo": "docker-compose logs -f mongo",
  "docker:status": "docker-compose ps",
  "docker:clean": "docker-compose down -v && docker system prune -f",
  "docker:rebuild": "npm run docker:down:clean && npm run docker:up:build"
}
```

### Usage Examples

#### Quick Start
```bash
# Build and start all services
npm run docker:up:build

# Check if everything is running
npm run docker:status
```

#### Development Workflow
```bash
# Start development environment
npm run docker:up:build

# Monitor logs in real-time (separate terminal)
npm run docker:logs

# View specific service logs
npm run docker:logs:backend
npm run docker:logs:frontend
npm run docker:logs:mongo
```

#### Maintenance
```bash
# Restart services without rebuilding
npm run docker:restart

# Complete rebuild (when stuck)
npm run docker:rebuild

# Clean shutdown
npm run docker:down

# Complete cleanup
npm run docker:clean
```

## 🛠️ Development Helper Script

### Overview
`docker-dev.sh` is a comprehensive development helper script that provides advanced Docker Compose management with health checks, colored output, and debugging tools.

### Features
- **Health Checks**: Automatic service health verification
- **Colored Output**: Easy-to-read terminal output
- **API Testing**: Built-in endpoint testing
- **Container Access**: Direct shell access to containers
- **Log Management**: Filtered log viewing

### Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `start` | Start all services with health check | `./docker-dev.sh start` |
| `stop` | Stop all services | `./docker-dev.sh stop` |
| `restart` | Restart services with health check | `./docker-dev.sh restart` |
| `build` | Build and start with health check | `./docker-dev.sh build` |
| `rebuild` | Clean rebuild (removes volumes) | `./docker-dev.sh rebuild` |
| `logs` | Show all logs (real-time) | `./docker-dev.sh logs` |
| `logs-backend` | Show backend logs only | `./docker-dev.sh logs-backend` |
| `logs-frontend` | Show frontend logs only | `./docker-dev.sh logs-frontend` |
| `logs-mongo` | Show MongoDB logs only | `./docker-dev.sh logs-mongo` |
| `status` | Show service status + health | `./docker-dev.sh status` |
| `clean` | Clean up everything | `./docker-dev.sh clean` |
| `shell-backend` | Access backend container shell | `./docker-dev.sh shell-backend` |
| `shell-frontend` | Access frontend container shell | `./docker-dev.sh shell-frontend` |
| `test-api` | Test API endpoints | `./docker-dev.sh test-api` |
| `help` | Show help menu | `./docker-dev.sh help` |

### Health Check Features
The script automatically verifies:
- ✅ Container status
- ✅ Frontend accessibility (port 3000)
- ✅ Backend accessibility (port 5000)
- ✅ MongoDB connectivity (port 27017)

## ⚙️ Environment Configuration

### Frontend Environment (`.env.docker`)
```env
# Frontend Environment Variables for Docker
VITE_APP_NAME=ChatCluster
VITE_APP_VERSION=1.0.0

# API Configuration - points to frontend port where nginx runs
VITE_API_BASE_URL=http://localhost:3000

# Production settings
VITE_NODE_ENV=production
```

### Backend Environment (`.env.docker`)
```env
# Backend Environment Variables for Docker
PORT=5000
MONGO_DB_URI=mongodb://mongo:27017/chat-app
JWT_SECRET=AdeshSecret
NODE_ENV=production
```

### Key Changes Made
1. **Frontend API URL**: Changed from `http://chat-backend:5000` to `http://localhost:3000`
   - Reason: Frontend should send requests to Nginx (port 3000), not directly to backend
2. **Backend Port**: Changed from 3001 to 5000
   - Reason: Clearer separation between frontend (3000) and backend (5000)

## 🔍 Monitoring and Debugging

### Real-time Log Monitoring

#### Watch All Services
```bash
# NPM command
npm run docker:logs

# Helper script
./docker-dev.sh logs
```

#### Watch Specific Services
```bash
# Backend only
npm run docker:logs:backend
./docker-dev.sh logs-backend

# Frontend only  
npm run docker:logs:frontend
./docker-dev.sh logs-frontend

# MongoDB only
npm run docker:logs:mongo
./docker-dev.sh logs-mongo
```

### Health Monitoring
```bash
# Quick status check
npm run docker:status

# Advanced health check with connectivity tests
./docker-dev.sh status
```

### Container Access for Debugging
```bash
# Access backend container
./docker-dev.sh shell-backend

# Access frontend container
./docker-dev.sh shell-frontend

# Manual container access
docker-compose exec chat-backend sh
docker-compose exec chat-frontend sh
```

### API Testing
```bash
# Test API endpoints
./docker-dev.sh test-api

# Manual API testing
curl http://localhost:5000        # Direct backend
curl http://localhost:3000/api/   # Through nginx proxy
```

## 🚀 Common Workflows

### 1. First Time Setup
```bash
# Clone repository
git clone <repository-url>
cd Chat-Cluster-main

# Build and start
npm run docker:up:build

# Monitor logs (separate terminal)
npm run docker:logs

# Check health
./docker-dev.sh status
```

### 2. Daily Development
```bash
# Start services
npm run docker:up

# Monitor specific service
npm run docker:logs:backend

# Make code changes...

# Restart after changes
npm run docker:restart
```

### 3. When Things Go Wrong
```bash
# Check what's wrong
./docker-dev.sh status

# View error logs
npm run docker:logs:backend

# Clean rebuild
npm run docker:rebuild

# Complete cleanup if needed
npm run docker:clean
```

### 4. Code Changes Workflow
```bash
# For backend changes
npm run docker:restart

# For frontend changes (requires rebuild)
npm run docker:up:build

# For major changes (clean slate)
./docker-dev.sh rebuild
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Check what's using the port
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Clean up and restart
npm run docker:clean
npm run docker:up:build
```

#### 2. Container Build Failures
```bash
# Clean rebuild with no cache
docker-compose build --no-cache
npm run docker:up

# Or use helper script
./docker-dev.sh rebuild
```

#### 3. Database Connection Issues
```bash
# Check MongoDB logs
npm run docker:logs:mongo

# Verify MongoDB is accessible
./docker-dev.sh test-api

# Access MongoDB directly
docker-compose exec mongo mongosh chat-app
```

#### 4. Frontend Not Loading
```bash
# Check frontend logs
npm run docker:logs:frontend

# Verify nginx configuration
./docker-dev.sh shell-frontend
cat /etc/nginx/conf.d/default.conf
```

#### 5. Backend API Errors
```bash
# Check backend logs
npm run docker:logs:backend

# Access backend container
./docker-dev.sh shell-backend

# Test backend directly
curl http://localhost:5000
```

#### 6. Nginx Proxy Issues
```bash
# Test API through proxy
curl http://localhost:3000/api/

# Check nginx logs
npm run docker:logs:frontend

# Verify proxy configuration
./docker-dev.sh shell-frontend
nginx -t
```

### Log Analysis

#### Error Patterns to Look For

**Frontend/Nginx Errors:**
- `502 Bad Gateway` - Backend not accessible
- `Connection refused` - Backend service down
- `upstream timed out` - Backend responding slowly

**Backend Errors:**
- `ECONNREFUSED` - MongoDB connection failed
- `MongoNetworkError` - Database connectivity issues
- `Authentication failed` - JWT/auth issues

**MongoDB Errors:**
- `connection refused` - MongoDB not running
- `authentication failed` - Database auth issues

### Performance Monitoring
```bash
# Check container resource usage
docker-compose top

# View container stats
docker stats

# Check Docker system usage
docker system df
```

## 📁 File Structure Changes

### Modified Files
```
Chat-Cluster-main/
├── package.json                    # Added Docker npm scripts
├── docker-compose.yml             # Updated ports (backend: 5000)
├── docker-dev.sh                  # NEW: Development helper script
├── backend/
│   ├── dockerfile                 # Updated EXPOSE port to 5000
│   └── .env.docker                # Updated PORT=5000
├── frontend/
│   ├── nginx.conf                 # Updated proxy to chat-backend:5000
│   └── .env.docker                # Updated API_BASE_URL to localhost:3000
└── DOCKER_DEVELOPMENT_GUIDE.md    # NEW: This documentation
```

## 🔗 Quick Reference

### Access URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017/chat-app
- **MongoDB Compass**: mongodb://localhost:27017/chat-app

### Essential Commands
```bash
# Quick start
npm run docker:up:build

# Monitor everything
npm run docker:logs

# Health check
./docker-dev.sh status

# Clean restart
npm run docker:rebuild

# Emergency cleanup
npm run docker:clean
```

### Environment Files Location
- Frontend: `frontend/.env.docker`
- Backend: `backend/.env.docker`

This documentation provides a complete reference for developing with the ChatCluster Docker setup. For additional help, run `./docker-dev.sh help` or `npm run` to see all available commands.
