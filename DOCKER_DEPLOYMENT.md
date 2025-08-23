# 🐳 ChatCluster - Docker Deployment Guide

**Author:** Adesh Ghadage  
**Repository:** https://github.com/AdeshGhadage/chatapp-cluster.git  
**Docker Registry:** adeshghadage/chatapp-*

## 📋 Environment Configuration

### 🔧 Environment Files Structure

The application uses separate environment files for local development and Docker deployment:

```
Chat-Cluster-main/
├── backend/
│   ├── .env          # Local development (excluded from git)
│   └── .env.docker   # Docker production (included in git)
├── frontend/
│   ├── .env          # Local development (excluded from git)
│   └── .env.docker   # Docker production (included in git)
└── docker-compose.yml
```

### 🛠️ Local Development Setup

1. **Backend Environment** (`backend/.env`):
```env
PORT=3001
MONGO_DB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=AdeshSecret
NODE_ENV=development
```

2. **Frontend Environment** (`frontend/.env`):
```env
VITE_APP_NAME=ChatCluster
VITE_API_BASE_URL=http://localhost:3001
VITE_NODE_ENV=development
```

### 🐳 Docker Deployment

The Docker environment files (`.env.docker`) are pre-configured for containerized deployment and use service names for internal communication.

## 🚀 Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Build and start all services**:
```bash
docker-compose up --build
```

2. **Run in detached mode**:
```bash
docker-compose up -d --build
```

3. **Stop services**:
```bash
docker-compose down
```

4. **Stop and remove volumes**:
```bash
docker-compose down -v
```

### Option 2: Individual Container Build

1. **Build Backend**:
```bash
cd backend
docker build -t chatapp-backend .
```

2. **Build Frontend**:
```bash
cd frontend
docker build -t chatapp-frontend .
```

3. **Run MongoDB**:
```bash
docker run -d --name mongo -p 27017:27017 mongo:7.0
```

4. **Run Backend**:
```bash
docker run -d --name backend -p 3001:3001 --link mongo chatapp-backend
```

5. **Run Frontend**:
```bash
docker run -d --name frontend -p 3000:3000 --link backend chatapp-frontend
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **MongoDB**: localhost:27017

## 🔧 Configuration Notes

### Backend Configuration
- **Port**: 3001
- **Database**: MongoDB on port 27017
- **JWT Secret**: Configure in environment files
- **CORS**: Configured for frontend domain

### Frontend Configuration
- **Built with**: Vite + React
- **Served by**: Nginx
- **Port**: 3000
- **API Proxy**: Configured in Vite config

### Database
- **MongoDB Version**: 7.0
- **Database Name**: chat-app
- **Volume**: Persistent storage mounted

## 📝 Development vs Production

| Aspect | Development | Docker Production |
|--------|-------------|-------------------|
| Database URL | `localhost:27017` | `mongo:27017` |
| API URL | `localhost:3001` | `backend:3001` |
| Environment | `development` | `production` |
| Hot Reload | ✅ Enabled | ❌ Disabled |
| Source Maps | ✅ Enabled | ❌ Disabled |

## 🛠️ Troubleshooting

### Common Issues

1. **Port Already in Use**:
```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001
lsof -i :27017

# Kill the process
kill -9 <PID>
```

2. **MongoDB Connection Issues**:
```bash
# Check MongoDB logs
docker logs chatapp-mongo

# Restart MongoDB
docker restart chatapp-mongo
```

3. **Frontend Not Loading**:
```bash
# Check frontend logs
docker logs chatapp-frontend

# Rebuild frontend
docker-compose up --build frontend
```

4. **Backend API Issues**:
```bash
# Check backend logs
docker logs chatapp-backend

# Restart backend
docker restart chatapp-backend
```

## 🔐 Security Considerations

- Change JWT secret in production
- Use environment-specific MongoDB credentials
- Configure proper CORS origins
- Enable HTTPS in production
- Use Docker secrets for sensitive data

## 📊 Monitoring

- **Container Status**: `docker ps`
- **Service Logs**: `docker-compose logs [service-name]`
- **Resource Usage**: `docker stats`
- **Health Checks**: Configure in docker-compose.yml

## 🎯 Production Deployment

For production deployment, consider:

1. **Use Docker Swarm or Kubernetes**
2. **Configure reverse proxy (Nginx)**
3. **Set up SSL certificates**
4. **Use managed MongoDB service**
5. **Implement proper logging**
6. **Set up monitoring and alerts**
7. **Configure backup strategies**

## 🐳 Docker Registry

This project uses Docker Hub registry under the `adeshghadage` namespace:

- **Backend Image**: `adeshghadage/chatapp-backend`
- **Frontend Image**: `adeshghadage/chatapp-frontend`

### 📤 Build and Push Images

Use the provided deployment script:

```bash
# Build and push all images with latest tag
./deploy.sh

# Build and push with custom tag
./deploy.sh v1.0.0

# Build and push only backend
./deploy.sh latest backend

# Build and push only frontend
./deploy.sh latest frontend
```

### 🔧 Manual Docker Commands

```bash
# Backend
cd backend
docker build -t adeshghadage/chatapp-backend:latest .
docker push adeshghadage/chatapp-backend:latest

# Frontend
cd frontend
docker build -t adeshghadage/chatapp-frontend:latest .
docker push adeshghadage/chatapp-frontend:latest
```
