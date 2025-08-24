# 💬 ChatCluster - Modern Real-Time Chat Application

**Author:** Adesh Ghadage  
**Repository:** https://github.com/AdeshGhadage/chatapp-cluster.git  
**Live Demo:** [Coming Soon]

![ChatCluster](https://img.shields.io/badge/ChatCluster-v1.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-010101?style=for-the-badge&logo=socket.io)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker)

## 🌟 Features

### ✨ **Modern UI/UX**
- 🎨 **Glassmorphism Design** - Beautiful transparent cards with backdrop blur
- 🌈 **Gradient Backgrounds** - Purple-blue gradient theme throughout
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎭 **Smooth Animations** - Engaging transitions and hover effects
- 🎯 **Intuitive Navigation** - Clean and user-friendly interface

### 🔐 **Security & Authentication**
- 🛡️ **JWT Authentication** - Secure token-based authentication
- 🔒 **Protected Routes** - Route protection for authenticated users
- 🍪 **HTTP-only Cookies** - Secure cookie storage for tokens
- 🔑 **Password Hashing** - Bcrypt password encryption
- 🚫 **CORS Protection** - Configured CORS for secure API access

### 💬 **Real-Time Communication**
- ⚡ **Socket.IO Integration** - Real-time bidirectional communication
- 📨 **Instant Messaging** - Messages appear instantly without refresh
- 👥 **Online Status** - See who's online in real-time
- 🔔 **Message Notifications** - Visual and audio notifications
- 📱 **Cross-Device Sync** - Messages sync across all devices

### 🛠️ **Technical Excellence**
- ⚛️ **React 18** - Latest React with hooks and context
- � **Vite Build Tool** - Lightning-fast development and builds
- 🎯 **TypeScript Ready** - Type definitions included
- 📦 **Component Architecture** - Modular and reusable components
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔧 **ESLint & Prettier** - Code quality and formatting

### 🐳 **DevOps & Deployment**
- 🐳 **Docker Support** - Full containerization with multi-stage builds
- ☸️ **Kubernetes Ready** - K8s manifests included
- 🔄 **CI/CD Pipeline** - Jenkins pipeline configuration
- 📊 **Environment Management** - Separate configs for dev/prod
- 🏗️ **Multi-Architecture** - Support for AMD64 and ARM64

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 18 or higher
- **MongoDB** 7.0 or higher
- **Docker** (optional, for containerized deployment)

### 🔧 Local Development

1. **Clone the repository**
```bash
git clone https://github.com/AdeshGhadage/chatapp-cluster.git
cd chatapp-cluster
```

2. **Set up Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Set up Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### 🐳 Docker Deployment

#### Using NPM Scripts (Recommended)
```bash
# Build and start all services
npm run docker:up:build

# Monitor logs
npm run docker:logs

# Check status
npm run docker:status

# Restart services
npm run docker:restart

# Clean rebuild
npm run docker:rebuild
```

#### Using Development Helper Script
```bash
# Make script executable
chmod +x docker-dev.sh

# Build and start with health checks
./docker-dev.sh build

# View specific service logs
./docker-dev.sh logs-backend
./docker-dev.sh logs-frontend
./docker-dev.sh logs-mongo

# Check service health
./docker-dev.sh status

# Access container shell for debugging
./docker-dev.sh shell-backend
```

#### Traditional Docker Compose
```bash
# Quick Start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 📊 Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### 📚 Documentation
- [📖 Docker Development Guide](DOCKER_DEVELOPMENT_GUIDE.md) - Comprehensive setup and usage guide
- [📝 Configuration Changes](CONFIGURATION_CHANGES_SUMMARY.md) - Summary of recent improvements

# Or build specific services
./deploy.sh latest backend
./deploy.sh latest frontend
```

3. **Using Pre-built Images**
```bash
# Pull from Docker Hub
docker pull adeshghadage/chatapp-backend:latest
docker pull adeshghadage/chatapp-frontend:latest
```

## 📁 Project Structure

```
chatapp-cluster/
├── 📂 backend/                 # Node.js/Express server
│   ├── 📂 controllers/        # Route controllers
│   ├── 📂 middleware/         # Auth & validation middleware
│   ├── 📂 models/            # MongoDB models
│   ├── 📂 routes/            # API routes
│   ├── 📂 socket/            # Socket.IO configuration
│   ├── 📂 utils/             # Utility functions
│   ├── 🐳 dockerfile         # Backend Docker config
│   └── 📄 server.js          # Entry point
├── 📂 frontend/               # React application
│   ├── 📂 src/
│   │   ├── 📂 components/    # Reusable components
│   │   ├── 📂 pages/         # Page components
│   │   ├── 📂 hooks/         # Custom React hooks
│   │   ├── 📂 context/       # React context providers
│   │   └── 📂 utils/         # Utility functions
│   ├── 🐳 dockerfile         # Frontend Docker config
│   └── ⚙️ vite.config.js     # Vite configuration
├── 📂 k8s_manifest/          # Kubernetes deployment files
├── 🐳 docker-compose.yml     # Docker Compose configuration
├── 🚀 deploy.sh              # Deployment script
├── 🔧 jenkinsfile           # CI/CD pipeline
├── 📚 DOCKER_DEPLOYMENT.md   # Docker deployment guide
└── 📖 README.md              # This file
```

## 🌐 API Endpoints

### 🔐 Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### 👥 Users
- `GET /api/users` - Get all users (protected)

### 💬 Messages
- `GET /api/messages/:id` - Get conversation messages
- `POST /api/messages/send/:id` - Send message

### 🔌 Socket Events
- `connection` - User connects
- `disconnect` - User disconnects
- `newMessage` - New message sent
- `getOnlineUsers` - Get online users list

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 5.4.19** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **React Router 6.30.1** - Navigation
- **Socket.IO Client 4.8.1** - Real-time communication
- **Zustand 4.5.7** - State management
- **React Hot Toast 2.4.1** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO 4.8.1** - Real-time communication
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Kubernetes** - Container orchestration
- **Jenkins** - CI/CD pipeline
- **Nginx** - Reverse proxy & static serving

## 🔧 Environment Variables

### Backend (`.env`)
```env
PORT=3001
MONGO_DB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Frontend (`.env`)
```env
VITE_APP_NAME=ChatCluster
VITE_API_BASE_URL=http://localhost:3001
VITE_NODE_ENV=development
```

## 🚀 Deployment Options

### 1. **Docker Compose** (Recommended)
```bash
docker-compose up -d --build
```

### 2. **Kubernetes**
```bash
kubectl apply -f k8s_manifest/
```

### 3. **Traditional VPS**
- Set up MongoDB
- Configure Nginx reverse proxy
- Run backend with PM2
- Serve frontend with Nginx

### 4. **Cloud Platforms**
- **Heroku** - Use provided configurations
- **AWS ECS** - Use Docker containers
- **Google Cloud Run** - Serverless containers
- **DigitalOcean App Platform** - Managed containers

## 📊 Performance & Monitoring

- **Real-time metrics** via Socket.IO
- **MongoDB indexing** for fast queries
- **Docker health checks** for reliability
- **Nginx caching** for static assets
- **CDN ready** for global distribution

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Adesh Ghadage**
- GitHub: [@AdeshGhadage](https://github.com/AdeshGhadage)
- Email: adesh.ghadage@example.com

## 🙏 Acknowledgments

- Thanks to the open-source community
- Inspired by modern chat applications
- Built with love and coffee ☕

---

⭐ **Star this repository if you found it helpful!**
