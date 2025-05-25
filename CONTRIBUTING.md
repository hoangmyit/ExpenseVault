# Contributing to ExpenseVault

Thank you for considering contributing to ExpenseVault! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the Issues section
- Use the bug report template to create a detailed report
- Include steps to reproduce, expected behavior, and actual behavior
- Attach screenshots if applicable

### Suggesting Features

- Check if the feature has already been suggested in the Issues section
- Use the feature request template to create a detailed suggestion
- Explain why this feature would be beneficial to the project

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Submit a pull request

## Development Setup

### Prerequisites

- .NET 8 SDK
- Node.js (v18+)
- pnpm
- SQL Server or PostgreSQL

### Setting Up the Development Environment

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ExpenseVault.git
   cd ExpenseVault
   ```

2. Set up the database
   ```bash
   dotnet ef --project .\EV.Infrastructure --startup-project .\ExpenseVault.Server database update
   ```

3. Start the backend
   ```bash
   cd ExpenseVault.Server
   dotnet run
   ```

4. Start the frontend
   ```bash
   cd expensevault.client
   pnpm install
   pnpm dev
   ```

## Coding Standards

### C# Code Style

- Follow Microsoft's C# coding conventions
- Use the included .editorconfig for consistent formatting
- Write meaningful comments and documentation
- Follow Clean Architecture principles

### TypeScript/React Code Style

- Follow the project's ESLint configuration
- Use functional components with hooks
- Implement proper TypeScript types
- Write unit tests for components

## Testing

- Write unit tests for new features
- Ensure existing tests pass
- Consider integration and end-to-end tests for complex features

## Documentation

- Update documentation when adding or modifying features
- Follow the established documentation style
- Consider updating the README if necessary

## Review Process

All contributions will go through a review process:

1. Automated checks (CI pipeline)
2. Code review by maintainers
3. Feedback and requested changes if necessary
4. Approval and merge

## Thank You

Your contributions help make ExpenseVault better for everyone. We appreciate your effort and time!

---

For questions or discussions, please use the Discussion tab in the GitHub repository.
