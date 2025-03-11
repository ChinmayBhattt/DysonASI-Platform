# Contributing to DysonASI Platform

Thank you for your interest in contributing to the DysonASI Platform! This document provides guidelines and steps for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the Issues section
2. If not, create a new issue with:
   - A clear title and description
   - Steps to reproduce the bug
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, etc.)

### Suggesting Enhancements

1. Check if the enhancement has been suggested in the Issues section
2. If not, create a new issue with:
   - A clear title and description
   - Use case and benefits
   - Implementation suggestions (if any)
   - Screenshots or mockups (if applicable)

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```
3. Make your changes following our coding standards
4. Write/update tests if necessary
5. Update documentation if needed
6. Commit your changes with clear commit messages
7. Push to your fork
8. Create a Pull Request

## Development Setup

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/DysonASI-Platform.git
   cd DysonASI-Platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Coding Standards

### JavaScript/TypeScript

- Use ES6+ features
- Follow the Airbnb JavaScript Style Guide
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### React Components

- Use functional components with hooks
- Follow the container/presenter pattern
- Implement proper prop types
- Keep components modular and reusable

### CSS/SCSS

- Use BEM naming convention
- Keep styles modular and scoped
- Use variables for colors, spacing, etc.
- Follow mobile-first approach

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Testing

- Write unit tests for new features
- Update existing tests when modifying code
- Ensure all tests pass before submitting PR
- Follow the testing best practices

## Documentation

- Update README.md if needed
- Add inline documentation for complex code
- Update API documentation for new endpoints
- Include examples in documentation

## Review Process

1. All pull requests will be reviewed by maintainers
2. Address review comments promptly
3. Keep pull requests focused and small
4. Respond to feedback constructively

## Getting Help

- Check the documentation
- Search existing issues
- Ask in the discussions section
- Contact maintainers if needed

Thank you for contributing to DysonASI Platform! 