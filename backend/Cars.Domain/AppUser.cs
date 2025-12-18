using Microsoft.AspNetCore.Identity;

namespace Cars.Domain;

public class AppUser : IdentityUser
{
    public string DisplayedName { get; set; }
    public string Bio { get; set; }
}
