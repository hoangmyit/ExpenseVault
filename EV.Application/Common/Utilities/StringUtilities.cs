namespace EV.Application.Common.Utilities
{
    public static class StringUtilities
    {
        public static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static string ToCamelCase(this string value)
        {
            if (string.IsNullOrEmpty(value))
            {
                return value;
            }
            return char.ToLowerInvariant(value[0]) + value.Substring(1);
        }
    }
}
