#!/bin/bash

# 🐳 ChatCluster Docker Build and Push Script
# Author: Adesh Ghadage
# Registry: adeshghadage

set -e

echo "🚀 ChatCluster Docker Build and Push Script"
echo "==========================================="

# Configuration
REGISTRY_USER="adeshghadage"
BACKEND_IMAGE="chatapp-backend"
FRONTEND_IMAGE="chatapp-frontend"
TAG=${1:-latest}

echo "📦 Using tag: $TAG"
echo "🏷️  Registry: $REGISTRY_USER"

# Function to build and push backend
build_and_push_backend() {
    echo ""
    echo "🔨 Building Backend Image..."
    cd backend
    docker build -t $REGISTRY_USER/$BACKEND_IMAGE:$TAG .
    echo "✅ Backend image built successfully"
    
    echo "📤 Pushing Backend Image..."
    docker push $REGISTRY_USER/$BACKEND_IMAGE:$TAG
    echo "✅ Backend image pushed successfully"
    cd ..
}

# Function to build and push frontend
build_and_push_frontend() {
    echo ""
    echo "🔨 Building Frontend Image..."
    cd frontend
    docker build -t $REGISTRY_USER/$FRONTEND_IMAGE:$TAG .
    echo "✅ Frontend image built successfully"
    
    echo "📤 Pushing Frontend Image..."
    docker push $REGISTRY_USER/$FRONTEND_IMAGE:$TAG
    echo "✅ Frontend image pushed successfully"
    cd ..
}

# Function to build and push all
build_and_push_all() {
    echo ""
    echo "🔨 Building All Images..."
    
    # Build backend
    build_and_push_backend
    
    # Build frontend
    build_and_push_frontend
    
    echo ""
    echo "🎉 All images built and pushed successfully!"
    echo ""
    echo "📋 Summary:"
    echo "  Backend:  $REGISTRY_USER/$BACKEND_IMAGE:$TAG"
    echo "  Frontend: $REGISTRY_USER/$FRONTEND_IMAGE:$TAG"
    echo ""
    echo "🚀 You can now deploy using:"
    echo "  docker-compose up -d"
    echo "  or"
    echo "  kubectl apply -f k8s_manifest/"
}

# Main menu
case "${2:-all}" in
    "backend")
        build_and_push_backend
        ;;
    "frontend")
        build_and_push_frontend
        ;;
    "all"|*)
        build_and_push_all
        ;;
esac

echo ""
echo "✨ Done!"
