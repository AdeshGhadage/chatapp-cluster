#!/bin/bash

# 🐳 ChatCluster Docker Development Helper Script
# Author: Adesh Ghadage

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 ChatCluster Docker Development Helper${NC}"
echo "=========================================="

# Function to show usage
show_help() {
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./docker-dev.sh [command]"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  start          - Start all services and show live logs"
    echo "  start-bg       - Start all services in background only"
    echo "  stop           - Stop all services"
    echo "  restart        - Restart all services"
    echo "  build          - Build and start services"
    echo "  rebuild        - Clean rebuild (removes volumes)"
    echo "  logs           - Show all logs"
    echo "  logs-backend   - Show backend logs only"
    echo "  logs-frontend  - Show frontend logs only"
    echo "  logs-mongo     - Show MongoDB logs only"
    echo "  status         - Show service status"
    echo "  clean          - Clean up everything"
    echo "  clean-pv       - Clean persistent volumes only"
    echo "  check-ports    - Check if required ports are available"
    echo "  kill-ports     - Kill processes using required ports"
    echo "  shell-backend  - Access backend container shell"
    echo "  shell-frontend - Access frontend container shell"
    echo "  test-api       - Test backend API endpoints"
    echo "  help           - Show this help"
}

# Function to check and kill processes using required ports
check_ports() {
    echo -e "${BLUE}🔍 Checking required ports...${NC}"
    
    local ports_in_use=false
    
    # Check port 3000 (Frontend)
    if lsof -i :3000 >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Port 3000 is in use:${NC}"
        lsof -i :3000
        ports_in_use=true
    fi
    
    # Check port 5000 (Backend)
    if lsof -i :3001 >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Port 3001 is in use:${NC}"
        lsof -i :3001
        ports_in_use=true
    fi
    
    # Check port 27017 (MongoDB)
    if lsof -i :27017 >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Port 27017 is in use:${NC}"
        lsof -i :27017
        ports_in_use=true
    fi
    
    if [ "$ports_in_use" = true ]; then
        echo ""
        echo -e "${RED}❌ Some required ports are in use!${NC}"
        echo -e "${YELLOW}💡 Solutions:${NC}"
        echo "  1. Run: ./docker-dev.sh kill-ports (to kill conflicting processes)"
        echo "  2. Run: ./docker-dev.sh clean (to stop Docker containers)"
        echo "  3. Or manually stop the processes shown above"
        return 1
    else
        echo -e "${GREEN}✅ All required ports are available${NC}"
        return 0
    fi
}

# Function to kill processes using required ports
kill_ports() {
    echo -e "${YELLOW}🔫 Killing processes using required ports...${NC}"
    
    # Kill processes on port 3000
    if lsof -ti :3000 >/dev/null 2>&1; then
        echo "Killing processes on port 3000..."
        lsof -ti :3000 | xargs kill -9 2>/dev/null || true
    fi
    
    # Kill processes on port 5000
    if lsof -ti :3001 >/dev/null 2>&1; then
        echo "Killing processes on port 3001..."
        lsof -ti :3001 | xargs kill -9 2>/dev/null || true
    fi
    
    # Kill processes on port 27017 (but not Docker containers)
    if lsof -ti :27017 >/dev/null 2>&1; then
        echo "Killing non-Docker processes on port 27017..."
        # Only kill mongod processes, not Docker
        pkill -f mongod 2>/dev/null || true
    fi
    
    echo -e "${GREEN}✅ Port cleanup complete${NC}"
    sleep 2
    check_ports
}
check_health() {
    echo -e "${BLUE}🔍 Checking service health...${NC}"
    
    # Check if services are running
    if ! docker-compose ps | grep -q "Up"; then
        echo -e "${RED}❌ Services are not running${NC}"
        return 1
    fi
    
    # Test frontend
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ Frontend (port 3000) - OK${NC}"
    else
        echo -e "${RED}❌ Frontend (port 3000) - Failed${NC}"
    fi
    
    # Test backend
    if curl -s http://localhost:3001 > /dev/null; then
        echo -e "${GREEN}✅ Backend (port 3001) - OK${NC}"
    else
        echo -e "${RED}❌ Backend (port 3001) - Failed${NC}"
    fi
    
    # Test MongoDB
    if docker-compose exec -T mongo mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ MongoDB (port 27017) - OK${NC}"
    else
        echo -e "${RED}❌ MongoDB (port 27017) - Failed${NC}"
    fi
}

# Function to test API endpoints
test_api() {
    echo -e "${BLUE}🧪 Testing API endpoints...${NC}"
    
    # Test health endpoint (if exists)
    echo "Testing backend health..."
    curl -s http://localhost:3001 || echo -e "${YELLOW}Backend root endpoint not responding${NC}"
    
    # Test through nginx proxy
    echo "Testing API through nginx proxy..."
    curl -s http://localhost:3000/api/ || echo -e "${YELLOW}API proxy not responding${NC}"
}

# Main command handling
case "${1:-help}" in
    "start")
        echo -e "${BLUE}🚀 Starting services...${NC}"
        # Check ports first
        if ! check_ports; then
            echo -e "${RED}❌ Cannot start services due to port conflicts${NC}"
            echo -e "${YELLOW}💡 Run './docker-dev.sh kill-ports' to fix this${NC}"
            exit 1
        fi
        docker-compose up -d
        echo -e "${BLUE}⏳ Waiting for services to initialize...${NC}"
        sleep 5
        check_health
        echo ""
        echo -e "${BLUE}📋 Showing live logs for all services (Ctrl+C to exit)...${NC}"
        echo -e "${YELLOW}Tip: Open another terminal to run commands while viewing logs${NC}"
        echo ""
        docker-compose logs -f
        ;;
    "start-bg")
        echo -e "${BLUE}🚀 Starting services in background...${NC}"
        # Check ports first
        if ! check_ports; then
            echo -e "${RED}❌ Cannot start services due to port conflicts${NC}"
            echo -e "${YELLOW}💡 Run './docker-dev.sh kill-ports' to fix this${NC}"
            exit 1
        fi
        docker-compose up -d
        echo -e "${BLUE}⏳ Waiting for services to initialize...${NC}"
        sleep 5
        check_health
        echo -e "${GREEN}✅ Services started in background${NC}"
        echo -e "${YELLOW}Tip: Use './docker-dev.sh logs' to view logs${NC}"
        ;;
    "stop")
        echo -e "${YELLOW}🛑 Stopping services...${NC}"
        docker-compose stop
        ;;
    "restart")
        echo -e "${BLUE}🔄 Restarting services...${NC}"
        docker-compose restart
        sleep 5
        check_health
        ;;
    "build")
        echo -e "${BLUE}🔨 Building and starting services...${NC}"
        docker-compose up --build -d
        sleep 10
        check_health
        ;;
    "rebuild")
        echo -e "${YELLOW}🧹 Clean rebuild (removing volumes)...${NC}"
        docker-compose down -v
        docker-compose up --build -d
        sleep 10
        check_health
        ;;
    "logs")
        echo -e "${BLUE}📋 Showing all logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f
        ;;
    "logs-backend")
        echo -e "${BLUE}📋 Showing backend logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f chat-backend
        ;;
    "logs-frontend")
        echo -e "${BLUE}📋 Showing frontend logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f chat-frontend
        ;;
    "logs-mongo")
        echo -e "${BLUE}📋 Showing MongoDB logs (Ctrl+C to exit)...${NC}"
        docker-compose logs -f mongo
        ;;
    "status")
        echo -e "${BLUE}📊 Service Status:${NC}"
        docker-compose ps
        echo ""
        check_health
        ;;
    "clean")
        echo -e "${YELLOW}🧹 Cleaning up everything...${NC}"
        docker-compose down -v
        docker system prune -f
        echo -e "${GREEN}✅ Cleanup complete${NC}"
        ;;
    "clean-pv")
        echo -e "${YELLOW}🗑️  Cleaning persistent volumes...${NC}"
        echo -e "${BLUE}📋 Current volumes:${NC}"
        docker volume ls | grep chat-cluster-main || echo "No project volumes found"
        echo ""
        echo -e "${YELLOW}⚠️  This will remove all MongoDB data!${NC}"
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker-compose down -v
            docker volume prune -f
            echo -e "${GREEN}✅ Persistent volumes cleaned${NC}"
            echo -e "${YELLOW}💡 Tip: Run './docker-dev.sh start' to recreate with fresh data${NC}"
        else
            echo -e "${BLUE}ℹ️  Operation cancelled${NC}"
        fi
        ;;
    "check-ports")
        check_ports
        ;;
    "kill-ports")
        kill_ports
        ;;
    "shell-backend")
        echo -e "${BLUE}🐚 Accessing backend container shell...${NC}"
        docker-compose exec chat-backend sh
        ;;
    "shell-frontend")
        echo -e "${BLUE}🐚 Accessing frontend container shell...${NC}"
        docker-compose exec chat-frontend sh
        ;;
    "test-api")
        test_api
        ;;
    "help"|*)
        show_help
        ;;
esac

echo ""
echo -e "${GREEN}✨ Done!${NC}"
