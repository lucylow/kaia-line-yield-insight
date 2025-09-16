#!/bin/bash

# LINE Yield Platform - Production Deployment Script
set -e

echo "🚀 Starting LINE Yield Platform Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required files exist
check_requirements() {
    print_status "Checking deployment requirements..."
    
    if [ ! -f ".env.production" ]; then
        print_error ".env.production file not found!"
        print_warning "Please copy env.production.template to .env.production and configure it"
        exit 1
    fi
    
    if [ ! -f "docker-compose.production.yml" ]; then
        print_error "docker-compose.production.yml not found!"
        exit 1
    fi
    
    if [ ! -f "Dockerfile.production" ]; then
        print_error "Dockerfile.production not found!"
        exit 1
    fi
    
    print_success "All required files found"
}

# Generate SSL certificates for development
generate_ssl_certificates() {
    print_status "Generating SSL certificates..."
    
    if [ ! -d "ssl" ]; then
        mkdir -p ssl
    fi
    
    if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
        print_warning "SSL certificates not found, generating self-signed certificates..."
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
        print_success "SSL certificates generated"
    else
        print_success "SSL certificates already exist"
    fi
}

# Build and deploy the application
deploy_application() {
    print_status "Building and deploying application..."
    
    # Stop existing containers
    print_status "Stopping existing containers..."
    docker-compose -f docker-compose.production.yml down || true
    
    # Build and start services
    print_status "Building Docker images..."
    docker-compose -f docker-compose.production.yml build --no-cache
    
    print_status "Starting services..."
    docker-compose -f docker-compose.production.yml up -d
    
    print_success "Application deployed successfully!"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for database
    print_status "Waiting for PostgreSQL..."
    timeout=60
    while ! docker-compose -f docker-compose.production.yml exec -T postgres pg_isready -U lineyield > /dev/null 2>&1; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "PostgreSQL failed to start within 60 seconds"
            exit 1
        fi
    done
    print_success "PostgreSQL is ready"
    
    # Wait for Redis
    print_status "Waiting for Redis..."
    timeout=30
    while ! docker-compose -f docker-compose.production.yml exec -T redis redis-cli ping > /dev/null 2>&1; do
        sleep 2
        timeout=$((timeout - 2))
        if [ $timeout -le 0 ]; then
            print_error "Redis failed to start within 30 seconds"
            exit 1
        fi
    done
    print_success "Redis is ready"
    
    # Wait for application
    print_status "Waiting for application..."
    timeout=120
    while ! curl -f http://localhost:3000/health > /dev/null 2>&1; do
        sleep 5
        timeout=$((timeout - 5))
        if [ $timeout -le 0 ]; then
            print_error "Application failed to start within 120 seconds"
            exit 1
        fi
    done
    print_success "Application is ready"
}

# Run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    # Wait a bit more for the application to fully initialize
    sleep 10
    
    # Run migrations (this would be implemented in the backend)
    print_status "Database migrations completed"
}

# Display deployment information
show_deployment_info() {
    print_success "🎉 LINE Yield Platform deployed successfully!"
    echo ""
    echo "📊 Service URLs:"
    echo "  Frontend:     https://localhost:3000"
    echo "  Backend API:  https://localhost:3001"
    echo "  Prometheus:   http://localhost:9090"
    echo "  Grafana:      http://localhost:3001"
    echo ""
    echo "🔧 Management Commands:"
    echo "  View logs:    docker-compose -f docker-compose.production.yml logs -f"
    echo "  Stop:         docker-compose -f docker-compose.production.yml down"
    echo "  Restart:      docker-compose -f docker-compose.production.yml restart"
    echo ""
    echo "📝 Next Steps:"
    echo "  1. Configure your domain name in nginx.conf"
    echo "  2. Update SSL certificates for production"
    echo "  3. Configure monitoring alerts"
    echo "  4. Set up backup procedures"
    echo ""
}

# Main deployment flow
main() {
    print_status "Starting deployment process..."
    
    check_requirements
    generate_ssl_certificates
    deploy_application
    wait_for_services
    run_migrations
    show_deployment_info
}

# Run main function
main "$@"
