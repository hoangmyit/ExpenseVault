# ExpenseVault Technical Context

## Technology Stack

### Backend

- **.NET 9.0**: Core framework for the server-side application
- **ASP.NET Core**: Web framework for building the API
- **Entity Framework Core**: ORM for database access
- **MediatR**: Mediator implementation for CQRS pattern
- **FluentValidation**: Validation library
- **AutoMapper**: Object-to-object mapping
- **NSwag**: API documentation
- **xUnit/NSubstitute/FluentAssertions**: Testing frameworks

### Frontend

- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind
- **Vitest**: Testing framework
- **React Router**: Client-side routing

### Database

- **SQL Server**: Primary data store
- **Entity Framework Core Migrations**: Database schema management

### Development Tools

- **Visual Studio**: Primary IDE
- **VS Code**: Frontend development
- **Azure DevOps**: Project management and CI/CD
- **Git**: Source control
- **Docker**: Containerization

## Development Environment Setup

### Required Software

- .NET 9.0 SDK
- Node.js and pnpm
- SQL Server/LocalDB
- Docker (optional)
- Visual Studio 2022+
- VS Code with JavaScript/TypeScript extensions

### Local Development Configuration

- SQL Server connection string in appsettings.Development.json
- CORS configuration for local API access
- Development certificates for HTTPS

## Build and Deployment Pipeline

### Local Development Workflow

- Backend run via Visual Studio or dotnet CLI
- Frontend development server via pnpm
- Database migrations through EF Core commands

```bash
# Add migration
dotnet ef --project EV.Infrastructure --startup-project .\ExpenseVault.Server migrations add [MigrationName]

# Update database
dotnet ef --project .\EV.Infrastructure --startup-project .\ExpenseVault.Server database update
```

### DevOps Pipeline

- Azure DevOps for CI/CD
- Automated testing on PR
- Build artifacts for deployment

## Technical Constraints

### Performance Requirements

- API response times under 500ms for standard operations
- Support for large datasets (10,000+ expenses)
- Efficient query patterns for reporting

### Security Requirements

- Secure authentication with JWT
- HTTPS for all communications
- Proper authorization for sensitive operations
- Data protection for financial information

### Scalability Considerations

- Horizontal scaling for API servers
- Database performance optimization
- Potential for future microservices architecture

## Integration Points

### External Services

- Email service for notifications
- Potential payment processor integration
- File storage for receipts and attachments

### API Architecture

- RESTful API with JSON response format
- OpenAPI/Swagger documentation
- Versioned API endpoints

## Testing Strategy

- Unit tests for domain and application logic
- Integration tests for API endpoints
- Frontend component tests with Vitest
- Manual testing for UX workflows
