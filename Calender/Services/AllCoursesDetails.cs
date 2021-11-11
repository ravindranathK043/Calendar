using Calender.Data;
using Calender.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Services
{
    public class AllCoursesDetails : IAllCourses
    {
        private readonly CoursesContext _context;
        public AllCoursesDetails (CoursesContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<AllCources>> GetAllCources()
        {
            return await _context.AllCourses.ToListAsync();
        }
    }
}
