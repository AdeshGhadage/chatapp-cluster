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

# Function to build and push backend to Docker Hub
build_and_push_backend() {
    echo ""
    echo "🔨 Building Backend Image..."
    cd backend
    docker build -t $REGISTRY_USER/$BACKEND_IMAGE:$TAG .
    echo "✅ Backend image built successfully"
    
    echo "📤 Pushing Backend Image to Docker Hub..."
    docker push $REGISTRY_USER/$BACKEND_IMAGE:$TAG
    echo "✅ Backend image pushed successfully"
    cd ..
}

# Function to build and push frontend to Docker Hub
build_and_push_frontend() {
    echo ""
    echo "🔨 Building Frontend Image..."
    cd frontend
    docker build -t $REGISTRY_USER/$FRONTEND_IMAGE:$TAG .
    echo "✅ Frontend image built successfully"
    
    echo "📤 Pushing Frontend Image to Docker Hub..."
    docker push $REGISTRY_USER/$FRONTEND_IMAGE:$TAG
    echo "✅ Frontend image pushed successfully"
    cd ..
}

# --- NEW: Function to build images for Minikube ---
build_for_minikube() {
    echo ""
    echo "🛠️  Configuring environment for Minikube..."
    eval $(minikube -p minikube docker-env)
    echo "✅ Docker environment set to Minikube"

    echo ""
    echo "🔨 Building Backend Image for Minikube..."
    cd backend
    docker build -t $REGISTRY_USER/$BACKEND_IMAGE:$TAG .
    echo "✅ Backend image built successfully for Minikube"
    cd ..

    echo ""
    echo "🔨 Building Frontend Image for Minikube..."
    cd frontend
    docker build -t $REGISTRY_USER/$FRONTEND_IMAGE:$TAG .
    echo "✅ Frontend image built successfully for Minikube"
    cd ..

    echo ""
    echo "🎉 All images built inside Minikube's Docker daemon!"
    echo "   You can now deploy using 'kubectl apply -f k8s/'"
    echo ""
    echo "ℹ️  To revert to your local Docker daemon, run: eval \$(minikube docker-env -u)"
}

# Function to build and push all to Docker Hub
build_and_push_all() {
    echo ""
    echo "🔨 Building All Images for Docker Hub..."
    build_and_push_backend
    build_and_push_frontend
    
    echo ""
    echo "🎉 All images built and pushed successfully!"
    echo ""
    echo "📋 Summary:"
    echo "  Backend:  $REGISTRY_USER/$BACKEND_IMAGE:$TAG"
    echo "  Frontend: $REGISTRY_USER/$FRONTEND_IMAGE:$TAG"
}

# Main menu
case "${2:-all}" in
    "backend")
        build_and_push_backend
        ;;
    "frontend")
        build_and_push_frontend
        ;;
    "minikube-build") # NEW: Minikube build command
        build_for_minikube
        ;;
    "all"|*)
        build_and_push_all
        ;;
esac

echo ""
echo "✨ Done!"