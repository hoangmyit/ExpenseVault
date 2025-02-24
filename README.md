# ExpenseVault

ExpenseVault is a web app built with .NET 8 and React 19 to simplify daily expense management. Track spending, set budgets, and gain insights with a responsive and user-friendly interface. Designed for security and accessibility, ExpenseVault helps you take control of your finances with ease, anytime and anywhere!

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
