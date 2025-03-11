# Deployment Guide

## Overview

This guide provides detailed instructions for deploying the DysonASI Platform to production environments. It covers both frontend and backend deployment, including configuration, monitoring, and maintenance.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- PM2 (for process management)
- Nginx (for reverse proxy)
- SSL certificate
- Domain name

## Server Setup

### 1. System Requirements

- Ubuntu 20.04 LTS or higher
- 4GB RAM minimum
- 2 CPU cores minimum
- 20GB SSD storage minimum

### 2. System Updates

```bash
# Update system packages
sudo apt update
sudo apt upgrade -y

# Install required packages
sudo apt install -y curl git build-essential nginx
```

### 3. Node.js Installation

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 4. MongoDB Installation

```bash
# Import MongoDB public key
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg

# Add MongoDB repository
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 5. PM2 Installation

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

## Application Deployment

### 1. Clone Repository

```bash
# Create application directory
sudo mkdir -p /var/www/dysonasi
sudo chown -R $USER:$USER /var/www/dysonasi

# Clone repository
cd /var/www/dysonasi
git clone https://github.com/ChinmayBhattt/DysonASI-Platform.git .
```

### 2. Environment Setup

```bash
# Create environment files
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/dysonasi

# JWT
JWT_SECRET=your_secure_jwt_secret

# Frontend
REACT_APP_API_URL=https://api.yourdomain.com
```

### 3. Build Application

```bash
# Install dependencies
npm install

# Build frontend
cd client
npm install
npm run build

# Build backend
cd ../server
npm install
npm run build
```

### 4. PM2 Configuration

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'dysonasi-backend',
    script: 'server/dist/app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

Start application:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Nginx Configuration

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/dysonasi
```

Configuration:
```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/dysonasi/client/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Enable Site

```bash
sudo ln -s /etc/nginx/sites-available/dysonasi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL Configuration

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain SSL Certificates

```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Monitoring Setup

### 1. PM2 Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Monitor application
pm2 monit
```

### 2. MongoDB Monitoring

```bash
# Install MongoDB monitoring tools
sudo apt install -y mongodb-mongosh

# Monitor MongoDB
mongosh
```

## Backup Strategy

### 1. Database Backup

Create backup script:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --out $BACKUP_DIR/backup_$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/backup_$DATE

# Remove uncompressed backup
rm -rf $BACKUP_DIR/backup_$DATE

# Keep only last 7 backups
ls -t $BACKUP_DIR/backup_*.tar.gz | tail -n +8 | xargs -r rm
```

### 2. Application Backup

```bash
# Backup application files
tar -czf /var/backups/dysonasi/app_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/dysonasi
```

## Maintenance

### 1. Regular Updates

```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Update Node.js
sudo npm install -g npm@latest

# Update application
cd /var/www/dysonasi
git pull
npm install
cd client && npm install && npm run build
cd ../server && npm install && npm run build

# Restart application
pm2 restart all
```

### 2. Log Management

```bash
# View application logs
pm2 logs

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

## Troubleshooting

### Common Issues

1. Application Not Starting
```bash
# Check logs
pm2 logs

# Check status
pm2 status

# Restart application
pm2 restart all
```

2. Nginx Issues
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

3. MongoDB Issues
```bash
# Check status
sudo systemctl status mongod

# Check logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongod
```

## Rollback Procedure

### 1. Application Rollback

```bash
# Stop application
pm2 stop all

# Restore from backup
cd /var/www/dysonasi
tar -xzf /var/backups/dysonasi/app_[BACKUP_DATE].tar.gz

# Restart application
pm2 start all
```

### 2. Database Rollback

```bash
# Stop application
pm2 stop all

# Restore database
mongorestore /var/backups/mongodb/backup_[BACKUP_DATE]

# Restart application
pm2 start all
``` 