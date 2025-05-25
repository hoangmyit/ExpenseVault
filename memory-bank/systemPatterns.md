# System Patterns: ExpenseVault

## Architectural Overview

ExpenseVault implements a clean, modular architecture following domain-driven design principles, structured in layers with clear separation of concerns:

```mermaid
graph TD
    Client[Client Application - React/TypeScript] --> |HTTP/API| Server[Server API - ASP.NET Core]
    Server --> |Commands/Queries| App[Application Layer]
    App --> Domain[Domain Layer]
    App --> |Repository Interface| Infra[Infrastructure Layer]
    Infra --> |Implementation| Domain
    Infra --> DB[(Database)]
```

## Key Architecture Patterns

### Clean Architecture

The solution follows Clean Architecture principles with concentric layers:

1. **Core (Domain)**: Contains business entities and logic, free from external dependencies
2. **Application**: Contains business use cases, coordinating domain entities
3. **Infrastructure**: Implements interfaces defined in the application layer
4. **Presentation**: Handles user interaction and API endpoints

Dependencies flow inward, with inner layers having no knowledge of outer layers, ensuring:

- Separation of concerns
- Testability
- Flexibility to change external systems

### Domain-Driven Design (DDD)

The domain model is designed around the core business concepts:

- **Entities**: Long-lived objects with identity (Expense, Category, Account)
- **Value Objects**: Immutable objects defined by attributes (Money, DateRange)
- **Aggregates**: Clusters of entities and value objects with a root entity
- **Domain Events**: Record significant state changes (ExpenseCreated, CategoryUpdated)
- **Repositories**: Abstract data access for domain objects

### Command Query Responsibility Segregation (CQRS)

The application layer is organized using CQRS pattern:

- **Commands**: Handle state changes (CreateExpense, UpdateCategory)
- **Queries**: Retrieve data without modifying state (GetExpensesList, GetCategoryDetails)
- **Handlers**: Process commands or queries and return results
- **Mediator**: Routes commands and queries to appropriate handlers

### Repository Pattern

Data access is abstracted through repositories:

- Domain entities are persisted through repository interfaces
- Implementation details (EF Core) are isolated in the infrastructure layer
- Repositories maintain the integrity of domain aggregates

## Component Relationships

### Backend Components

```mermaid
graph TD
    Controller[API Controllers] --> |Use| Mediator[MediatR]
    Mediator --> |Routes to| CH[Command Handlers]
    Mediator --> |Routes to| QH[Query Handlers]
    CH --> |Use| Domain[Domain Services/Entities]
    QH --> |Use| Domain
    CH --> |Use| Repo[Repositories]
    QH --> |Use| Repo
    Repo --> |Implement| EF[Entity Framework Core]
    EF --> DB[(Database)]
```

### Frontend Components

```mermaid
graph TD
    Routes[React Router] --> Pages[Pages/Views]
    Pages --> Components[UI Components]
    Pages --> Hooks[Custom Hooks]
    Components --> |Use| State[State Management]
    Hooks --> |Use| State
    State --> |API Calls| Services[API Services]
    Services --> |HTTP| Backend[Backend API]
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant API
    participant TokenService
    participant Database
    
    User->>Client: Enter Credentials
    Client->>API: Login Request
    API->>Database: Validate Credentials
    Database-->>API: Valid User
    API->>TokenService: Generate JWT
    TokenService-->>API: Access & Refresh Tokens
    API-->>Client: Return Tokens
    Client->>Client: Store Tokens
    
    Note over Client,API: Subsequent Requests
    
    Client->>API: Request with Access Token
    API->>API: Validate Token
    API-->>Client: Response
    
    Note over Client,API: Token Refresh
    
    Client->>API: Use Refresh Token
    API->>TokenService: Validate & Generate New Tokens
    TokenService-->>API: New Tokens
    API-->>Client: Return New Tokens
```

## Data Flow

```mermaid
graph TD
    UI[User Interface] -->|Submit Form| VC[View Component]
    VC -->|Dispatch Action| SM[State Management]
    SM -->|API Call| AS[API Service]
    AS -->|HTTP Request| API[API Controller]
    API -->|Command| Mediator[MediatR]
    Mediator -->|Route| Handler[Command Handler]
    Handler -->|Validate| Validator[Fluent Validator]
    Handler -->|Repository Call| Repo[Repository]
    Repo -->|EF Core| DB[(Database)]
    
    DB -->|Entity| Repo
    Repo -->|Domain Object| Handler
    Handler -->|DTO| API
    API -->|Response| AS
    AS -->|Result| SM
    SM -->|Updated State| VC
    VC -->|Render| UI
```

## Error Handling Pattern

The application implements a centralized error handling approach:

- Domain exceptions capture business rule violations
- Application exceptions represent use case failures
- Infrastructure exceptions handle technical issues
- Global exception middleware transforms exceptions into appropriate HTTP responses
- Frontend error boundaries catch and display user-friendly messages

## Validation Strategy

- **Domain Validation**: Enforces invariants within domain entities
- **Application Validation**: Uses FluentValidation for command/query validation
- **API Validation**: Leverages model binding validation
- **Client Validation**: Implements form validation before submission

**Current Date:** May 25, 2025
