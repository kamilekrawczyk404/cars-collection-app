using System.ComponentModel.DataAnnotations;

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

    [Required]
    public string Bio { get; set; }
}
