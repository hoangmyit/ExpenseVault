using System.Text.RegularExpressions;

namespace ExpenseVault.Server.Infrastructures
{
    public static class StringExtensions
    {
        /// <summary>
        /// Converts a string from PascalCase or camelCase to kebab-case.
        /// </summary>
        /// <param name="input">The string to convert.</param>
        /// <returns>A kebab-case string where capital letters are converted to lowercase and preceded by a hyphen.</returns>
        public static string ToKebabCase(this string input)
        {
            if (string.IsNullOrEmpty(input))
                return input;

            // Add a hyphen before each capital letter and convert to lowercase
            var result = Regex.Replace(input, "([a-z])([A-Z])", "$1-$2").ToLower();
            return result;
        }
    }
}
