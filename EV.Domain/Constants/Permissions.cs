namespace EV.Domain.Constants;

public static class Permissions
{
    // Category Permissions
    public static class Categories
    {
        public const string View = "Categories.View";
        public const string Create = "Categories.Create";
        public const string Edit = "Categories.Edit";
        public const string Delete = "Categories.Delete";
    }

    // Expense Permissions
    public static class Expenses
    {
        public const string View = "Expenses.View";
        public const string Create = "Expenses.Create";
        public const string Edit = "Expenses.Edit";
        public const string Delete = "Expenses.Delete";
    }

    // Report Permissions
    public static class Reports
    {
        public const string View = "Reports.View";
        public const string Create = "Reports.Create";
        public const string Export = "Reports.Export";
    }

    // User Management Permissions
    public static class Users
    {
        public const string View = "Users.View";
        public const string Create = "Users.Create";
        public const string Edit = "Users.Edit";
        public const string Delete = "Users.Delete";
    }
}
