using Calender.Controllers;
using Calender.Data;
using Calender.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Xunit;

namespace CalendarTest
{
    public class CalenderTest
    {
        private readonly CoursesContext _context;
        private readonly CoursesController _Courses;
        private readonly AllCoursesController _AllCourses;
        Courses courses;
        public CalenderTest()
        {
            _Courses = new CoursesController(_context);
            _AllCourses = new AllCoursesController(_context);
            courses = new Courses();
        }
        [Fact]
        public void Get_All_Courses()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _AllCourses.GetAllCourses());
        }
        [Fact]
        public void Get_Courses()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _Courses.GetCourses());
        }
        [Fact]
        public void Get_Courses_id()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _Courses.GetCourses(1));
        }
        [Fact]
        public void Post_Courses()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _Courses.PostCourses(courses));
        }
        [Fact]
        public void Put_course()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _Courses.PutCourses(2, courses));
        }
        [Fact]
        public void DeleteCourse()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => _Courses.DeleteCourses(2));
        }
    }
}
