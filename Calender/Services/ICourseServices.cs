using Calender.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Services
{
    public interface ICourseServices
    {
        Task<IEnumerable<Courses>> GetCoursesList();
        Task<Courses> GetCoursesById(int Id);
        Task<Courses> CreateCourses(Courses courses);
        Task updateCourse(Courses courses);
        Task DeleteCourse(Courses courses);
    }
}
