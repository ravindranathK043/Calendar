using Amazon.Util.Internal.PlatformServices;
using Calender.Data;
using Calender.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Calender.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly CoursesContext _context; 
       
        public UserController(CoursesContext content)
        {
            _context = content;
        }

        //GET :api/AllCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDetail>>> GetUser()
        {
            return await _context.UserDetail.ToListAsync();
        }



        [HttpPost]
        [Route("Login")]
        //POST : /api/User/Login
        public async Task<IActionResult> Login(UserDetail model)
        {
            var user = await _context.UserDetail.FindAsync(model.UserName);
            var user1 = await _context.UserDetail.FindAsync(model.Password);
            if (user != null && user1 != null)//await _context.UserDetail.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.UserId.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567889999999")), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            //else
            return BadRequest(new { message = "Username or password is incorrect." });
        }

    }
}
