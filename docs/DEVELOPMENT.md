# Development Guide

## Development Environment Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git
- npm or yarn
- VS Code (recommended)

### IDE Setup

#### VS Code Extensions
- ESLint
- Prettier
- GitLens
- MongoDB for VS Code
- REST Client
- React Developer Tools

#### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.rulers": [80],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

## Project Structure

### Frontend (client/)
```
client/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   └── forms/        # Form components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── store/            # Redux store
│   │   ├── actions/     # Redux actions
│   │   ├── reducers/    # Redux reducers
│   │   └── types/       # TypeScript types
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom hooks
│   ├── styles/          # Global styles
│   ├── assets/          # Images, fonts, etc.
│   ├── App.tsx          # Root component
│   └── index.tsx        # Entry point
└── package.json
```

### Backend (server/)
```
server/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── app.ts          # Express app
├── tests/              # Test files
└── package.json
```

## Development Workflow

### 1. Starting the Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

This will start both frontend and backend servers:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 2. Database Setup

1. Start MongoDB:
```bash
mongod
```

2. Create database:
```bash
mongo
use dysonasi
```

### 3. Environment Variables

Create `.env` files in both client and server directories:

#### client/.env
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

#### server/.env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dysonasi
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Use Jest for unit testing
- Use React Testing Library for component testing
- Use Supertest for API testing

Example test:
```typescript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/dysonasi/i)).toBeInTheDocument();
  });
});
```

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Formatting

```bash
# Run Prettier
npm run format
```

## Deployment

### Production Build

```bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build
```

### Deployment Checklist

1. Update environment variables
2. Run tests
3. Build frontend and backend
4. Deploy to production server
5. Monitor logs and performance

## Common Issues and Solutions

### 1. MongoDB Connection Issues

- Check if MongoDB is running
- Verify connection string in .env
- Check network connectivity

### 2. CORS Issues

- Verify CORS configuration in server
- Check API URL in frontend
- Ensure proper headers are set

### 3. Authentication Issues

- Check JWT token in localStorage
- Verify token expiration
- Ensure proper headers are sent

## Performance Optimization

### Frontend

1. Code Splitting
2. Lazy Loading
3. Image Optimization
4. Bundle Analysis

### Backend

1. Caching
2. Database Indexing
3. Query Optimization
4. Rate Limiting

## Security Best Practices

1. Input Validation
2. XSS Prevention
3. CSRF Protection
4. Rate Limiting
5. Secure Headers
6. Password Hashing
7. JWT Token Management

## Monitoring and Logging

### Frontend Monitoring

- Error tracking
- Performance monitoring
- User analytics

### Backend Monitoring

- Server metrics
- Database performance
- API response times
- Error logging 