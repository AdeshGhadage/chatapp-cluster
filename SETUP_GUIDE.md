# Chat Cluster - Setup Instructions

## Quick Start Commands

### 1. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies  
cd frontend && npm install && cd ..
```

### 2. Environment Setup
Create a `.env` file in the root directory with:
```
PORT=5000
MONGO_DB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
NODE_ENV=development
```

### 3. Start MongoDB
```bash
# If using local MongoDB
brew services start mongodb/brew/mongodb-community
# OR
sudo systemctl start mongod
```

### 4. Run the Application

#### Option A: Development Mode (Recommended)
```bash
# Terminal 1: Start backend server
npm run server

# Terminal 2: Start frontend development server
cd frontend && npm run dev
```

#### Option B: Production Build
```bash
# Build the entire application
npm run build

# Start production server
npm start
```

### 5. Access the Application
- Frontend: http://localhost:5173 (development) or http://localhost:5000 (production)
- Backend API: http://localhost:5000/api

## Docker Setup (Alternative)

### Build and Run with Docker
```bash
# Build backend image
cd backend
docker build -t chat-app-backend .

# Build frontend image  
cd ../frontend
docker build -t chat-app-frontend .

# Run with docker-compose (create docker-compose.yml first)
docker-compose up -d
```

## Development Workflow

1. **Backend development**: Edit files in `backend/` folder
2. **Frontend development**: Edit files in `frontend/src/` folder
3. **Real-time testing**: Open multiple browser tabs to test chat functionality
4. **Database**: Use MongoDB Compass to view/edit data

## Troubleshooting

### Common Issues:
- **Port already in use**: Change PORT in .env file
- **MongoDB connection failed**: Ensure MongoDB is running
- **Module not found**: Run `npm install` in both root and frontend directories
- **CORS errors**: Backend already configured for local development

### Reset Everything:
```bash
# Clean install
rm -rf node_modules frontend/node_modules
npm install
cd frontend && npm install
```
