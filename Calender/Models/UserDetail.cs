using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Models
{
    public class UserDetail
    {
        public UserDetail()
        {
            Courses = new HashSet<Courses>();
        }
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public virtual IEnumerable<Courses> Courses { get; set; }
    }
}
