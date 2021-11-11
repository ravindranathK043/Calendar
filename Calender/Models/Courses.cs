using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Models
{
    public class Courses
    {
        [Key]
        public int Id { get; set; }
        //public int CourseId { get; set; }
        public string PreRequisite { get; set; }
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime Timings { get; set; }
        public string LinkToJoin { get; set; }

        
        public int? CourseId { get; set; }
        public virtual  AllCources Course { get; set; }
        public int? UserId { get; set; }
        public virtual UserDetail Users { get; set; }
        public int? TrainerId { get; set; }
       public virtual Trainer Trainer { get; set; }
    }
}
