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

        public static string MaskEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
            {
                return email; // Return as-is if email is invalid or empty
            }

            var atIndex = email.IndexOf('@');
            var maskedLocalPart = email.Substring(0, 1) + new string('*', atIndex - 2) + email.Substring(atIndex - 1, 1);
            return maskedLocalPart + email.Substring(atIndex);
        }
    }
}
