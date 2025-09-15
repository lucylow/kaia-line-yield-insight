#!/bin/bash

# LINE Yield Platform Deployment Script
echo "🚀 Deploying LINE Yield Platform..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create deployment directory
    echo "📁 Creating deployment directory..."
    mkdir -p deployment
    
    # Copy built files to deployment directory
    echo "📋 Copying built files..."
    cp -r dist/* deployment/
    
    # Copy environment example
    cp env.example deployment/.env.example
    
    # Create deployment README
    cat > deployment/README.md << EOF
# LINE Yield Platform - Production Build

## 🌟 Platform Overview
LINE Yield is a comprehensive DeFi platform built on Kaia blockchain, leveraging Kaia-native USDT and stablecoin DeFi protocols to create unique trade-and-earn experiences within the LINE messenger ecosystem.

## 🚀 Features
- **Kaia Blockchain Integration**: Native support for Kaia blockchain
- **Yield Farming**: Automated yield optimization with up to 12.5% APY
- **NFT Marketplace**: Buy, sell, and use NFTs as collateral
- **Referral System**: Multi-level referral program with rewards
- **Payment Integration**: QR code payments and blockchain transactions
- **Wallet Connectivity**: Support for multiple wallet types
- **Social Features**: LINE integration and social sharing

## 📱 Platform Support
- **LIFF (LINE Front-end Framework)**: Native LINE app experience
- **Web Version**: Responsive web application
- **Mobile Optimization**: Mobile-first design with PWA support

## 🔧 Configuration
1. Copy \`.env.example\` to \`.env\`
2. Update environment variables with your configuration
3. Deploy to your preferred hosting platform

## 🌐 Deployment Options
- **Vercel**: \`vercel --prod\`
- **Netlify**: Upload \`dist\` folder
- **GitHub Pages**: Push to \`gh-pages\` branch
- **Custom Server**: Serve \`dist\` folder with any web server

## 📚 Documentation
See the main README.md for complete documentation and setup instructions.

Built with ❤️ by the LINE Yield team
EOF

    echo "✅ Deployment package created in 'deployment/' directory"
    echo "📋 Files ready for deployment:"
    ls -la deployment/
    
    echo ""
    echo "🎉 Deployment complete! Your LINE Yield Platform is ready."
    echo "📁 Deployment files are in the 'deployment/' directory"
    echo "🌐 You can now deploy to your preferred hosting platform"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
