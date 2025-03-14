# ExpenseVault

ExpenseVault is a web app built with .NET 8 and React 19 to simplify daily expense management. Track spending, set budgets, and gain insights with a responsive and user-friendly interface. Designed for security and accessibility, ExpenseVault helps you take control of your finances with ease, anytime and anywhere!

## Structure

### Front-end

- Apply Tailwind and DaisyUI
- Setup Vitest
- React router
- Example base layout

### Back-end

- Implement CLEAN architecture
- Implement Swagger
- Implement MediatR
- Implement simple workflow CRUD on category
- Implement EF core Code first with SQL Server

## Set up

### Database Migrations

- Add migration

```bash
 dotnet ef --project EV.Infrastructure --startup-project .\ExpenseVault.Server migrations add *comment here*
```

- Update database

```bash
dotnet ef --project .\EV.Infrastructure --startup-project .\ExpenseVault.Server update database
```

## Status

[![Board Status](https://dev.azure.com/hoangmyit/60cc3e6e-54db-409f-b1e0-e88c18a72c4d/0b31a195-dd7a-4a82-8134-bcc2a7182059/_apis/work/boardbadge/376f7740-e3ce-47d3-84da-7ff1bd6afbf5)](https://dev.azure.com/hoangmyit/60cc3e6e-54db-409f-b1e0-e88c18a72c4d/_boards/board/t/0b31a195-dd7a-4a82-8134-bcc2a7182059/Stories/)
