# LINE Yield Platform - Production Deployment Guide

This guide provides comprehensive instructions for deploying the LINE Yield Platform to production using Docker and Docker Compose.

## Prerequisites

### System Requirements
- **OS**: Linux (Ubuntu 20.04+ recommended) or macOS
- **RAM**: Minimum 8GB, Recommended 16GB+
- **Storage**: Minimum 50GB free space
- **CPU**: Minimum 4 cores, Recommended 8+ cores

### Software Requirements
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git
- OpenSSL (for SSL certificate generation)

### External Services
- Domain name and DNS configuration
- SSL certificate (Let's Encrypt recommended)
- Supabase account and project
- LINE Developer account
- Stripe account (for payments)

## Pre-Deployment Setup

### 1. Environment Configuration

Copy the environment template and configure it:

```bash
cp env.production.template .env.production
```

Edit `.env.production` with your production values:

```bash
# Required: Database password
POSTGRES_PASSWORD=your_secure_database_password

# Required: Redis password
REDIS_PASSWORD=your_secure_redis_password

# Required: Supabase configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Required: Security keys
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key

# Required: LINE integration
LINE_CHANNEL_ID=your_line_channel_id
LINE_CHANNEL_SECRET=your_line_channel_secret
LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
LINE_LIFF_ID=your_liff_id

# Required: Payment integration
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Optional: Monitoring
GRAFANA_PASSWORD=your_grafana_password
```

### 2. SSL Certificate Setup

For production, obtain a proper SSL certificate:

#### Option A: Let's Encrypt (Recommended)
```bash
# Install Certbot
sudo apt update
sudo apt install certbot

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Copy certificates to ssl directory
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
sudo chown $USER:$USER ssl/cert.pem ssl/key.pem
```

#### Option B: Self-signed (Development only)
```bash
mkdir -p ssl
openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=yourdomain.com"
```

### 3. Domain Configuration

Update `nginx.conf` with your domain:

```nginx
server_name yourdomain.com www.yourdomain.com;
```

## Deployment Process

### 1. Automated Deployment

Run the deployment script:

```bash
./deploy-production.sh
```

This script will:
- Check requirements
- Generate SSL certificates (if needed)
- Build Docker images
- Start all services
- Wait for services to be ready
- Run database migrations
- Display deployment information

### 2. Manual Deployment

If you prefer manual deployment:

```bash
# Stop existing containers
docker-compose -f docker-compose.production.yml down

# Build images
docker-compose -f docker-compose.production.yml build --no-cache

# Start services
docker-compose -f docker-compose.production.yml up -d

# Check status
docker-compose -f docker-compose.production.yml ps
```

## Post-Deployment Configuration

### 1. Database Setup

The database will be automatically initialized with the provided schema files. Verify the setup:

```bash
# Connect to database
docker-compose -f docker-compose.production.yml exec postgres psql -U lineyield -d line_yield_production

# Check tables
\dt
```

### 2. Monitoring Setup

Access monitoring services:

- **Prometheus**: http://yourdomain.com:9090
- **Grafana**: http://yourdomain.com:3001
  - Default login: admin / (password from GRAFANA_PASSWORD)

### 3. Health Checks

Verify all services are running:

```bash
# Check application health
curl -f https://yourdomain.com/health

# Check database
docker-compose -f docker-compose.production.yml exec postgres pg_isready -U lineyield

# Check Redis
docker-compose -f docker-compose.production.yml exec redis redis-cli ping
```

## Service Management

### View Logs
```bash
# All services
docker-compose -f docker-compose.production.yml logs -f

# Specific service
docker-compose -f docker-compose.production.yml logs -f line-yield-app
```

### Restart Services
```bash
# Restart all services
docker-compose -f docker-compose.production.yml restart

# Restart specific service
docker-compose -f docker-compose.production.yml restart line-yield-app
```

### Update Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```

## Security Considerations

### 1. Firewall Configuration

Configure your server firewall:

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 2. Regular Updates

Keep your system and Docker images updated:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose -f docker-compose.production.yml pull
docker-compose -f docker-compose.production.yml up -d
```

### 3. Backup Strategy

Set up regular backups:

```bash
# Database backup
docker-compose -f docker-compose.production.yml exec postgres pg_dump -U lineyield line_yield_production > backup_$(date +%Y%m%d_%H%M%S).sql

# Volume backup
docker run --rm -v line-yield_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup_$(date +%Y%m%d_%H%M%S).tar.gz /data
```

## Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Check port usage
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :3001

# Kill conflicting processes
sudo kill -9 <PID>
```

#### 2. Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
chmod +x deploy-production.sh
```

#### 3. Database Connection Issues
```bash
# Check database logs
docker-compose -f docker-compose.production.yml logs postgres

# Reset database
docker-compose -f docker-compose.production.yml down -v
docker-compose -f docker-compose.production.yml up -d
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in ssl/cert.pem -text -noout

# Regenerate certificates
rm ssl/cert.pem ssl/key.pem
./deploy-production.sh
```

### Performance Optimization

#### 1. Resource Limits

Add resource limits to `docker-compose.production.yml`:

```yaml
services:
  line-yield-app:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

#### 2. Database Optimization

Configure PostgreSQL for production:

```bash
# Edit postgresql.conf
docker-compose -f docker-compose.production.yml exec postgres psql -U lineyield -d line_yield_production -c "ALTER SYSTEM SET shared_buffers = '256MB';"
docker-compose -f docker-compose.production.yml exec postgres psql -U lineyield -d line_yield_production -c "ALTER SYSTEM SET effective_cache_size = '1GB';"
docker-compose -f docker-compose.production.yml exec postgres psql -U lineyield -d line_yield_production -c "SELECT pg_reload_conf();"
```

## Monitoring and Maintenance

### 1. Health Monitoring

Set up monitoring alerts for:
- Service availability
- Database performance
- Memory usage
- Disk space
- SSL certificate expiration

### 2. Log Management

Configure log rotation:

```bash
# Create logrotate configuration
sudo tee /etc/logrotate.d/docker-compose << EOF
/var/lib/docker/containers/*/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0644 root root
}
EOF
```

### 3. Security Monitoring

Regular security checks:
- Update dependencies
- Scan for vulnerabilities
- Monitor access logs
- Review SSL certificate status

## Support and Maintenance

For ongoing support and maintenance:

1. **Regular Updates**: Keep all components updated
2. **Monitoring**: Use Prometheus and Grafana for system monitoring
3. **Backups**: Implement automated backup procedures
4. **Security**: Regular security audits and updates
5. **Performance**: Monitor and optimize performance metrics

## Contact

For deployment support or issues:
- Check the logs first: `docker-compose -f docker-compose.production.yml logs -f`
- Review this guide for common solutions
- Contact the development team for advanced troubleshooting

---

**Note**: This deployment guide assumes a standard Linux server setup. Adjustments may be needed for specific cloud providers or custom configurations.
