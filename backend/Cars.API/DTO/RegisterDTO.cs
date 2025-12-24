using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace CarsWebApplication.DTO;

public class RegisterDTO
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$")]
    public string Password { get; set; }

    [Required]
    public string DisplayName { get; set; }

    [Required]
    public string UserName { get; set; }

    public string? Bio { get; set; }
}
