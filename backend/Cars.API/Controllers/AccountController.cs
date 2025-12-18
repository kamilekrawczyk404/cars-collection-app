using Cars.Domain;
using CarsWebApplication.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Cars.Application;

public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        // Find user by email
        var user = await _userManager.FindByEmailAsync(loginDTO.Email);

        if (user == null)
            return Unauthorized();

        // Check if password matches
        var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

        if (result)
        {
            // Return as a DTO object
            return new UserDTO
            {
                DisplayName = user.DisplayedName,
                UserName = user.UserName,
                Token = "pozniej",
                Bio = user.Bio,
            };
        }

        return Unauthorized();
    }
}
