using System.Diagnostics.CodeAnalysis;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Identity;

namespace Cars.Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }

    public string? Bio { get; set; }
}
