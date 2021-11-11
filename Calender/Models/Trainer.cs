using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Calender.Models
{
    public class Trainer
    {
        public Trainer()
        {
            Courses = new HashSet<Courses>();
        }
        [Key]
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public virtual IEnumerable<Courses> Courses { get; set; }
    }
}
