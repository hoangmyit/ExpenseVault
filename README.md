# ExpenseVault - Modern Expense Tracking Solution

## Project Overview

ExpenseVault is a comprehensive expense tracking application designed to help individuals and businesses efficiently manage their financial transactions. This solution provides a robust platform for recording, categorizing, and analyzing expenses, enabling users to gain better control over their financial activities.

## Key Features

- **Expense Tracking**: Log and monitor all expenses with detailed information
- **Categorization**: Organize expenses into customizable categories
- **Financial Analysis**: Generate reports and visualize spending patterns
- **Multi-user Support**: Different access levels for team members
- **Secure Authentication**: Protect sensitive financial data
- **Responsive Design**: Access from any device with a consistent experience

## Target Audience

- **Individual Users**: Personal finance management
- **Small Businesses**: Track business expenses and receipts
- **Finance Teams**: Manage departmental budgets and expenses
- **Freelancers**: Separate personal and business expenses

## Technical Architecture

ExpenseVault implements a clean, modular architecture following domain-driven design principles:

### 1. Domain Layer (EV.Domain)

The core of the application containing:

- **Entities**: Expense, Category, User, Transaction models
- **Value Objects**: Money, DateRange, RecurrenceRule
- **Domain Events**: ExpenseCreated, CategoryUpdated
- **Domain Services**: Core business logic without external dependencies

### 2. Application Layer (EV.Application)

Orchestrates the application workflow:

- **Commands/Queries**: Following CQRS pattern for clear separation
- **DTOs**: Data transfer objects for API communication
- **Validators**: Input validation logic
- **Mappers**: Object transformation between layers
- **Authorization**: Fine-grained permission system

### 3. Infrastructure Layer (EV.Infrastructure)

Provides technical capabilities:

- **Data Persistence**: Entity Framework Core implementation
- **Identity Services**: Authentication and user management
- **External Integrations**: Email, payment processing, file storage
- **Caching**: Performance optimization strategies

### 4. Presentation Layer

- **ExpenseVault.Server**: ASP.NET Core API backend
- **expensevault.client**: Modern responsive frontend with React 19

## Technology Stack

- **Backend**: .NET 8, Entity Framework Core, ASP.NET Core
- **Frontend**: TypeScript with React 19
- **Database**: SQL Server/PostgreSQL
- **Authentication**: JWT token-based auth with refresh capabilities
- **API Documentation**: Swagger/OpenAPI
- **Testing**: xUnit, NSubstitute, and Fluent Assertions

## Key Project Benefits

- **Clean Architecture**: Maintainable and testable codebase
- **Domain-Driven Design**: Business-focused development approach
- **Security-First**: Protecting sensitive financial information
- **Performance Optimized**: Fast response times even with large datasets
- **Extensible Design**: Easy to add new features and integrations

## Getting Started

To run the project locally:

1. Clone the repository
2. Ensure .NET 8 SDK is installed
3. Create and configure the application database:

   ```bash
   dotnet ef --project .\EV.Infrastructure --startup-project .\ExpenseVault.Server database update
   ```

4. Run the backend API project
5. Launch the frontend client application with `pnpm dev`

## Future Roadmap

- Mobile applications for iOS and Android
- Advanced reporting capabilities
- Budget planning features
- OCR receipt scanning
- Integration with accounting software
