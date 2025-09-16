# Quick Start Guide

This guide will help you get the Kaia LINE Yield Platform up and running quickly.

## 🚀 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- Git
- Docker (optional, for containerized development)

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lucylow/kaia-line-yield-insight.git
   cd kaia-line-yield-insight
   ```

2. **Install pnpm globally**
   ```bash
   npm install -g pnpm
   ```

3. **Install all dependencies**
   ```bash
   pnpm install
   ```

## ⚙️ Configuration

### Web Application
```bash
cp apps/web/env.example apps/web/.env
```

Edit `apps/web/.env`:
```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
VITE_APP_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:3000
VITE_LIFF_ID=your_liff_id
VITE_LINE_CHANNEL_ID=your_channel_id
```

### Backend API
```bash
cp apps/backend/env.example apps/backend/.env
```

Edit `apps/backend/.env`:
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/line_yield
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
LINE_CHANNEL_ACCESS_TOKEN=your_access_token
LINE_CHANNEL_SECRET=your_channel_secret
```

## 🏃‍♂️ Running the Application

### Option 1: Run All Services
```bash
pnpm dev
```

### Option 2: Run Individual Services

**Web Application:**
```bash
pnpm --filter web dev
```
Available at `http://localhost:5173/`

**Backend API:**
```bash
pnpm --filter backend dev
```
Available at `http://localhost:3000/`

**Smart Contracts:**
```bash
pnpm --filter contracts compile
```

## 🐳 Docker Development

### Using Docker Compose
```bash
# Start all services with Docker
docker-compose -f infrastructure/docker/docker-compose.yml up

# Start specific services
docker-compose -f infrastructure/docker/docker-compose.yml up web backend
```

## 🧪 Testing

### Run All Tests
```bash
pnpm test
```

### Run Specific Tests
```bash
# Test smart contracts
pnpm --filter contracts test

# Test web application
pnpm --filter web test

# Test backend
pnpm --filter backend test
```

## 🔨 Building

### Build All Applications
```bash
pnpm build
```

### Build Specific Applications
```bash
# Build web application
pnpm --filter web build

# Build backend
pnpm --filter backend build

# Compile smart contracts
pnpm --filter contracts compile
```

## 📚 Available Scripts

### Root Level Scripts
- `pnpm dev` - Start all development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages
- `pnpm test` - Run all tests
- `pnpm clean` - Clean all build artifacts

### Package-Specific Scripts
- `pnpm --filter web dev` - Start web development server
- `pnpm --filter backend dev` - Start backend development server
- `pnpm --filter contracts compile` - Compile smart contracts
- `pnpm --filter contracts test` - Test smart contracts

## 🔧 Development Tools

### VS Code Extensions
Install recommended extensions:
```bash
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension JuanBlanco.solidity
code --install-extension bradlc.vscode-tailwindcss
```

### Useful Commands
```bash
# Check workspace status
pnpm list --depth=0

# Add dependency to specific package
pnpm --filter web add react-router-dom

# Remove dependency from specific package
pnpm --filter web remove react-router-dom

# Run command in specific package
pnpm --filter web exec npm run build
```

## 🚨 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Ensure you're running commands from the root directory
   - Run `pnpm install` to install all dependencies

2. **Port conflicts**
   - Web app runs on port 5173
   - Backend runs on port 3000
   - Change ports in respective `.env` files if needed

3. **Environment variables not loading**
   - Ensure `.env` files are in the correct directories
   - Check that variable names match the expected format

4. **Smart contract compilation errors**
   - Ensure you have the correct Solidity version
   - Check that all dependencies are installed

### Getting Help

- Check the [Project Structure Documentation](./PROJECT_STRUCTURE.md)
- Review the [Main README](../README.md)
- Open an issue on GitHub for bugs or feature requests

## 🎯 Next Steps

1. **Explore the Codebase**: Start with `/apps/web/src/` for the frontend
2. **Read Documentation**: Check `/docs/` for detailed guides
3. **Set Up Database**: Configure your database connection
4. **Configure LINE Integration**: Set up LINE LIFF and messaging API
5. **Deploy**: Follow the deployment guide for production setup

## 📖 Additional Resources

- [Project Structure Documentation](./PROJECT_STRUCTURE.md)
- [Main README](../README.md)
- [API Documentation](./api/)
- [Smart Contract Documentation](./contracts/)
- [Deployment Guide](./deployment/)
