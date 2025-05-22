# ExpenseVault System Patterns

## Architectural Overview

ExpenseVault follows the Clean Architecture pattern with clear separation of concerns across multiple layers:

```note
┌─────────────────────────────────────────────┐
│ Presentation Layer                          │
│ (ExpenseVault.Server, expensevault.client)  │
├─────────────────────────────────────────────┤
│ Application Layer (EV.Application)          │
├─────────────────────────────────────────────┤
│ Infrastructure Layer (EV.Infrastructure)    │
├─────────────────────────────────────────────┤
│ Domain Layer (EV.Domain)                    │
└─────────────────────────────────────────────┘
```

## Key Architectural Patterns

### Clean Architecture

- Clear separation of concerns
- Dependencies point inward (domain at the center)
- Outer layers depend on inner layers, never the reverse
- Domain layer has no dependencies on other layers

### Domain-Driven Design (DDD)

- Rich domain model with entities, value objects, and domain events
- Encapsulated business logic in domain entities
- Aggregates defining transaction boundaries
- Domain events for cross-aggregate communication

### Command Query Responsibility Segregation (CQRS)

- Separation of read and write operations
- Commands for state changes (mutations)
- Queries for data retrieval (no state changes)
- MediatR for commands/queries pipeline

### Repository Pattern

- Abstraction layer between domain and data access
- Domain entities persistence without exposing storage details
- Centralized data access logic

## Component Relationships

### Domain Layer Components

- **Entities**: Core business objects (Expense, Category, Budget)
- **Value Objects**: Immutable objects representing concepts without identity
- **Domain Events**: Notification of state changes within the domain
- **Domain Services**: Complex operations involving multiple entities

### Application Layer Components

- **Commands/Queries**: Request objects representing user intentions
- **Handlers**: Processing logic for commands and queries
- **DTOs**: Data transfer objects for API communication
- **Validators**: Input validation rules
- **Behaviors**: Cross-cutting concerns (logging, validation, authorization)

### Infrastructure Layer Components

- **Repositories**: Implementation of domain repositories
- **DbContext**: Entity Framework context for data access
- **Identity Services**: Authentication and authorization
- **External Services**: Email, file storage, etc.

### Presentation Layer Components

- **Controllers**: API endpoints
- **Middleware**: Request/response processing
- **React Components**: UI elements
- **State Management**: Client-side data management

## Cross-Cutting Concerns

### Authentication & Authorization

- Identity services for user authentication
- Permission-based authorization with role management
- JWT tokens for API authentication

### Validation

- FluentValidation for input validation
- Validation behaviors in command/query pipeline

### Error Handling

- Exception middleware for consistent error responses
- Domain exceptions for business rule violations
- Application exceptions for application-specific errors

### Logging & Monitoring

- Structured logging throughout the application
- Performance monitoring in request pipeline

## Data Flow Patterns

- API requests flow through controllers to application handlers
- Commands/queries dispatched through MediatR
- Domain events published after successful operations
- Repositories handle data persistence operations
