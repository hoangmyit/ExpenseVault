// EV.Domain/Constants/Permissions.cs
namespace EV.Domain.Constants
{
    public static class Permissions
    {
        public static class Categories
        {
            public const string View = "Category:R";
            public const string Create = "Category:C";
            public const string Edit = "Category:U";
            public const string Delete = "Category:D";
            public const string All = "Category:*";
        }

        public static class Expenses
        {
            public const string View = "Expense:R";
            public const string Create = "Expense:C";
            public const string Edit = "Expense:U";
            public const string Delete = "Expense:D";
            public const string All = "Expense:*";
        }

        public static class Reports
        {
            public const string View = "Report:R";
            public const string Create = "Report:C";
            public const string Export = "Report:E";
            public const string All = "Report:*";
        }

        public static class Users
        {
            public const string View = "User:R";
            public const string Create = "User:C";
            public const string Edit = "User:U";
            public const string Delete = "User:D";
            public const string All = "User:*";
        }
    }
}
