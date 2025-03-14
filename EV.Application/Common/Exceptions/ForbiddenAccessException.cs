namespace EV.Application.Common.Exceptions;

public class ForbiddenAccessException : Exception
{
    public string[] RequiredPermissions { get; }

    public ForbiddenAccessException()
        : base("Access to the requested resource is forbidden.")
    {
        RequiredPermissions = Array.Empty<string>();
    }

    public ForbiddenAccessException(string message)
        : base(message)
    {
        RequiredPermissions = Array.Empty<string>();
    }

    public ForbiddenAccessException(string message, string[] requiredPermissions)
        : base(message)
    {
        RequiredPermissions = requiredPermissions;
    }
}
