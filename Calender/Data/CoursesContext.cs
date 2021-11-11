using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Calender.Models;

namespace Calender.Data
{
    public class CoursesContext : DbContext
    {
        public CoursesContext(DbContextOptions<CoursesContext> options)
            : base(options)
        {
        }

        public DbSet<Calender.Models.Courses> Courses { get; set; }
        public DbSet<Calender.Models.AllCources> AllCourses { get; set; }
        public DbSet<Calender.Models.UserDetail> UserDetail { get; set; }
        public DbSet<Calender.Models.Trainer> Trainer { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Courses>(entity =>
            {
             
                entity.HasOne(d => d.Course)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.CourseId)
                    .HasConstraintName("FK_Courses_AllCourses");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Courses_UserDetail");

                entity.HasOne(d => d.Trainer)
                    .WithMany(p => p.Courses)
                    .HasForeignKey(d => d.TrainerId)
                    .HasConstraintName("FK_Courses_Trainer");
            });
            
        }
    }
}
