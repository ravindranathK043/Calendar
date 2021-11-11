using Calender.Data;
using Calender.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Services
{
    public class CoursesDetails : ICourseServices
    {
        private readonly CoursesContext _courses;
        public CoursesDetails(CoursesContext context)
        {
            _courses = context;
        }
        public async Task<IEnumerable<Courses>> GetCoursesList()
        {
            return await _courses.Courses.AsNoTracking()
                .AsQueryable().ToListAsync();
        }
        public async Task<Courses> GetCoursesById(int Id)
        {
            return await _courses.Courses.AsNoTracking()
                .AsQueryable().FirstOrDefaultAsync(X=>X.Id== Id);           
        }

        public async Task<Courses> CreateCourses(Courses courses)
        {
            _courses.Courses.Add(courses);
            await _courses.SaveChangesAsync();
            return courses;
        }        
       
        public async Task DeleteCourse(Courses courses)
        {
            _courses.Courses.Remove(courses);
            await _courses.SaveChangesAsync();
        }

        public async Task updateCourse(Courses courses)
        {
            _courses.Courses.Update(courses);
            await _courses.SaveChangesAsync();
        }

      
    }
}
