# Nuxt Better Auth

![Tests](https://github.com/Oipnet/nuxt-better-auth/workflows/Code%20Quality%20&%20Tests/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-local%20reports-green)
![TypeScript](https://img.shields.io/badge/TypeScript-✅%20No%20Errors-blue)

A modern authentication system built with Nuxt 3, Better Auth, and a comprehensive UI component library.

## ✨ Features

- 🔐 **Authentication**: Email/password with Better Auth
- 🎨 **UI Components**: Complete Tailwind CSS component system
- 🧪 **Testing**: 45 tests with 100% success rate
- 🌍 **i18n**: Multi-language support
- 📱 **Responsive**: Mobile-first design
- ⚡ **Performance**: Optimized Nuxt 3 setup

## 📊 Code Quality

- **Test Coverage**: >90%
- **Components Tested**: 4/6 UI components
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint + Prettier configured

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 📊 Testing & Coverage

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Open coverage report in browser
npm run test:coverage:open

# Run tests in watch mode
npm run test:watch
```

### Coverage Reports
Local coverage reports are generated in `app/coverage/`:
- **HTML Report**: `app/coverage/index.html` - Interactive coverage browser
- **LCOV Report**: `app/coverage/lcov.info` - For CI/CD integration  
- **JSON Report**: `app/coverage/coverage-final.json` - Programmatic access

### Quality Scripts
```bash
# Run full quality check (lint + typecheck + tests)
npm run quality

# Auto-fix formatting and linting issues
npm run quality:fix
```
