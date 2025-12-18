using System.Security.Claims;
using Cars.Domain;
using CarsWebApplication.DTO;
using CarsWebApplication.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cars.Application;

[ApiController]
[Route(("api/[controller]"))]
public class AccountController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;

    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
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
            var jwtToken = _tokenService.CreateToken(user);

            // Return as a DTO object
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Bio = user.Bio,
                Token = jwtToken,
            };
        }

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
        if (await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
        {
            return BadRequest("This email is already stored in our database");
        }

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            Bio = registerDto.Bio,
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            return new UserDTO
            {
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                Bio = user.Bio,
                Token = _tokenService.CreateToken(user),
            };
        }

        return BadRequest("Some problems occurs while creating a new user.");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        return new UserDTO
        {
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user),
            UserName = user.UserName,
        };
    }
}
