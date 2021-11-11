import { AllCourses } from "./all-courses";
import { Trainer } from "./trainer";
import { Userdetail } from "./userdetail";


export interface Courses {

  id: number;
  courseId?: number;
  preRequisite: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  timings: Date;
  linkToJoin: string;
  userId?: number;
  trainerId?: number;
  course?: AllCourses;
  users?: Userdetail;
  trainer?: Trainer;
}
