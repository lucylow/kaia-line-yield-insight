# Project Structure Documentation

This document provides a comprehensive overview of the reorganized project structure for the Kaia LINE Yield Platform.

## 📁 Directory Overview

### `/apps/` - Application Packages
Contains all deployable applications in the monorepo.

#### `/apps/web/` - Web Application
- **Purpose**: Main React frontend application
- **Technology**: React 18, TypeScript, Vite, Tailwind CSS
- **Key Files**:
  - `src/` - React application source code
  - `public/` - Static assets
  - `package.json` - Web app dependencies
  - `vite.config.js` - Vite build configuration
  - `tailwind.config.js` - Tailwind CSS configuration
  - `tsconfig.json` - TypeScript configuration

#### `/apps/liff/` - LINE LIFF Application
- **Purpose**: LINE Front-end Framework application
- **Technology**: React, LINE LIFF SDK
- **Key Files**:
  - `package.json` - LIFF app dependencies
  - `src/` - LIFF-specific React components

#### `/apps/backend/` - Backend API Service
- **Purpose**: Node.js/Express backend API
- **Technology**: Node.js, Express, TypeScript, Supabase
- **Key Files**:
  - `src/` - Backend source code
  - `package.json` - Backend dependencies
  - `tsconfig.json` - TypeScript configuration
  - `.env` - Environment variables

### `/packages/` - Shared Packages
Contains reusable packages shared across applications.

#### `/packages/ui/` - Shared UI Components
- **Purpose**: Reusable React components
- **Technology**: React, TypeScript, Tailwind CSS
- **Usage**: Imported by web and LIFF applications

#### `/packages/utils/` - Shared Utilities
- **Purpose**: Common utility functions
- **Technology**: TypeScript
- **Usage**: Shared across all applications

#### `/packages/types/` - Shared TypeScript Types
- **Purpose**: Common TypeScript type definitions
- **Technology**: TypeScript
- **Usage**: Type safety across the monorepo

#### `/packages/config/` - Shared Configurations
- **Purpose**: Shared configuration files
- **Files**:
  - `eslint.config.js` - ESLint configuration
  - `components.json` - UI component configuration
  - `lovable.config.js` - Lovable platform configuration

### `/contracts/` - Smart Contracts
Contains all Solidity smart contracts organized by functionality.

#### `/contracts/core/` - Core Contracts
- `Vault.sol` - Main vault contract
- `GaslessVault.sol` - Gasless transaction vault

#### `/contracts/nft/` - NFT Contracts
- `NFTMarketplace.sol` - NFT marketplace
- `NFTStaking.sol` - NFT staking contract
- `YieldNFT.sol` - Yield farming NFT
- `YieldPointsNFT.sol` - Points-based NFT

#### `/contracts/lending/` - Lending Contracts
- `MultiLoanManager.sol` - Multi-loan management
- `LiquidationEngine.sol` - Liquidation system
- `OnchainCreditScore.sol` - Credit scoring

#### `/contracts/payments/` - Payment Contracts
- `LinePaymentProvider.sol` - LINE payment integration
- `PaymentProcessor.sol` - Payment processing
- `SettlementContract.sol` - Settlement system

#### `/contracts/security/` - Security Contracts
- `SecureVault.sol` - Secure vault implementation
- `SecurityOracle.sol` - Security oracle

#### `/contracts/strategies/` - Strategy Contracts
- `StrategyManager.sol` - Strategy management
- `AaveStrategy.sol` - Aave integration
- `KlaySwapStrategy.sol` - KlaySwap integration

#### `/contracts/tokens/` - Token Contracts
- `LineYieldPoints.sol` - Yield points token
- `LYToken.sol` - Platform token
- `YieldToken.sol` - Yield token
- `StakingRewards.sol` - Staking rewards

#### `/contracts/interfaces/` - Contract Interfaces
- `ILiquidationEngine.sol` - Liquidation interface
- `INFTPriceOracle.sol` - NFT price oracle interface
- `IStrategy.sol` - Strategy interface

#### `/contracts/mocks/` - Mock Contracts
- `MockUSDT.sol` - Mock USDT for testing
- `MockAaveStrategy.sol` - Mock Aave strategy
- `MockCompoundStrategy.sol` - Mock Compound strategy

### `/infrastructure/` - Infrastructure & Deployment
Contains all infrastructure-related configurations.

#### `/infrastructure/docker/` - Docker Configurations
- `Dockerfile` - Main Docker configuration
- `Dockerfile.production` - Production Docker configuration
- `docker-compose.yml` - Development Docker Compose
- `docker-compose.production.yml` - Production Docker Compose
- `nginx.conf` - Nginx configuration

#### `/infrastructure/scripts/` - Deployment Scripts
- `deploy.sh` - Development deployment script
- `deploy-production.sh` - Production deployment script
- Various utility scripts

#### `/infrastructure/kubernetes/` - Kubernetes Configurations
- Kubernetes manifests for production deployment

#### `/infrastructure/terraform/` - Infrastructure as Code
- Terraform configurations for cloud infrastructure

#### `/infrastructure/supabase/` - Supabase Configuration
- `supabase.toml` - Supabase project configuration

### `/database/` - Database Files
Contains all database-related files.

#### `/database/schemas/` - Database Schemas
- `database-schema.sql` - Main database schema
- `database-schema-credit.sql` - Credit scoring schema
- `database-schema-loans.sql` - Loans schema
- `database-schema-payments.sql` - Payments schema
- `database-schema-rewards.sql` - Rewards schema
- `database-schema-tokenomics.sql` - Tokenomics schema

#### `/database/migrations/` - Database Migrations
- Database migration scripts

#### `/database/seeds/` - Seed Data
- Initial data for development and testing

### `/docs/` - Documentation
Contains all project documentation.

#### `/docs/guides/` - User and Developer Guides
- User guides and tutorials
- Developer setup guides
- Integration guides

#### `/docs/api/` - API Documentation
- REST API documentation
- WebSocket API documentation

#### `/docs/contracts/` - Smart Contract Documentation
- Contract specifications
- ABI documentation
- Integration guides

#### `/docs/deployment/` - Deployment Documentation
- Deployment guides
- Infrastructure documentation

### `/tools/` - Development Tools
Contains development and utility tools.

#### `/tools/crawlers/` - Documentation Crawlers
- `docs-crawler/` - Documentation crawler
- `line-docs-crawler/` - LINE documentation crawler

#### `/tools/monitoring/` - Monitoring Configurations
- `prometheus.yml` - Prometheus configuration
- `alert.rules.yml` - Alert rules

#### `/tools/testing/` - Test Utilities
- `jest.config.js` - Jest configuration
- Test utilities and helpers

#### `/tools/dune/` - Analytics Tools
- Dune Analytics queries and dashboards

### `/examples/` - Example Code
Contains example code and demos.

### `/.github/` - GitHub Configuration
Contains GitHub workflows and templates.

#### `/.github/workflows/` - CI/CD Workflows
- `ci.yml` - Continuous Integration workflow
- `deploy.yml` - Deployment workflow

### `/.vscode/` - VS Code Configuration
Contains VS Code workspace settings.

- `settings.json` - Workspace settings
- `extensions.json` - Recommended extensions

## 🔧 Configuration Files

### Root Level Configuration
- `package.json` - Root package.json with workspace configuration
- `pnpm-workspace.yaml` - PNPM workspace configuration
- `.gitignore` - Git ignore rules
- `README.md` - Main project documentation

### Workspace Configuration
The project uses PNPM workspaces for efficient dependency management:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'contracts'
```

## 🚀 Development Workflow

### Installing Dependencies
```bash
# Install all dependencies
pnpm install

# Install dependencies for specific package
pnpm --filter web install
```

### Running Applications
```bash
# Run all applications
pnpm dev

# Run specific application
pnpm --filter web dev
pnpm --filter backend dev
pnpm --filter contracts compile
```

### Building Applications
```bash
# Build all applications
pnpm build

# Build specific application
pnpm --filter web build
pnpm --filter backend build
```

### Testing
```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter contracts test
```

## 📦 Package Dependencies

### Web Application Dependencies
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Wagmi + Viem for blockchain integration
- Reown AppKit for wallet connectivity

### Backend Dependencies
- Express.js for API framework
- Supabase for database and auth
- Redis for caching
- Winston for logging
- JWT for authentication

### Smart Contract Dependencies
- Hardhat for development environment
- OpenZeppelin for secure contracts
- Solhint for linting

## 🔄 Migration Notes

### From Previous Structure
The project has been reorganized from a flat structure to a monorepo structure:

**Before:**
- All source code in `/src/`
- Configuration files scattered in root
- Mixed concerns in single directories

**After:**
- Clear separation of applications in `/apps/`
- Shared code in `/packages/`
- Infrastructure organized in `/infrastructure/`
- Documentation centralized in `/docs/`

### Benefits of New Structure
1. **Clear Separation**: Each application has its own directory
2. **Shared Code**: Common utilities and components are reusable
3. **Infrastructure as Code**: All deployment configs are organized
4. **Documentation**: All docs are centralized and categorized
5. **Tooling**: Development tools are separated from application code
6. **Monorepo**: Single repository for all related code
7. **Scalability**: Easy to add new applications or packages
8. **Maintainability**: Clear structure makes code easier to maintain

## 🎯 Next Steps

1. **Update Import Paths**: Update all import statements to reflect new structure
2. **Configure CI/CD**: Set up GitHub Actions for automated testing and deployment
3. **Add Shared Packages**: Create shared UI components and utilities
4. **Documentation**: Add comprehensive documentation for each package
5. **Testing**: Set up testing infrastructure for all packages
6. **Deployment**: Configure deployment pipelines for each application
