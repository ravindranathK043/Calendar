using Calender.Data;
using Calender.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllCoursesController : ControllerBase
    {
        private readonly CoursesContext _context;
        public AllCoursesController(CoursesContext content)
        {
            _context = content;
        }

        //GET :api/AllCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AllCources>>> GetAllCourses()
        {
            return await _context.AllCourses.ToListAsync();
        }
    }
}
