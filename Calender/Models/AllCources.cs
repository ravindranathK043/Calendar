using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Models
{
    public class AllCources
    {
        public AllCources()
        {
            Courses = new HashSet<Courses>();
        }

        [Key]
        public int CourseId { get; set; }
        public string CourserName { get; set; }

        public virtual IEnumerable<Courses> Courses { get; set; }
    }
}
