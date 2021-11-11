import { DatePipe, formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllCourses } from '../all-courses';
import { AllCoursesService } from '../all-courses.service';
import { Courses } from '../courses';
import { CoursesService } from '../courses.service';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { Userdetail } from '../userdetail';
import { UserdetailService } from '../userdetail.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  courses: AllCourses[] = []; user: Userdetail[] = []; trainer: Trainer[] = [];
  createForm: any; msg!: string;
  form: FormGroup = new FormGroup({});
  startDate: any; public dateFrom?: string;
  public currentDate?: string;
  //currentDate = new Date();

  constructor(
    public courseSer: CoursesService,
    public allCour: AllCoursesService,
    public AllUser: UserdetailService,
    public allTrainer: TrainerService,
    private route: ActivatedRoute,
    private router: Router, 
    private fromBuilder: FormBuilder
  ) {
    this.createForm = this.fromBuilder.group({
      courseId: ['', Validators.required],
      preRequisite: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      timings: ['', Validators.required],
      linkToJoin: ['', Validators.required],
      userId: ['', Validators.required],
      trainerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.dateFrom = new Date().toISOString().split('T')[0];

    this.allCour.getAllCourses().subscribe((data: AllCourses[]) => {
      this.courses = data
    });
    this.AllUser.getUser().subscribe((data: Userdetail[]) => {
      var Name = localStorage.getItem("Users")?.replace(/^"|"$/g, '');
      if (Name == "admin" || Name == "")
        this.user = data.filter(x =>x.userId != 1);
      else
        this.user = data.filter(x => x.userName == Name && x.userId!=1);
    });
    this.allTrainer.getTrainer().subscribe((data: Trainer[]) => {
      this.trainer = data;
    });
     
  }
 
  onSubmit(fromData: { value: any; }) {
    this.courseSer.createCourses(fromData.value).subscribe(res => {
      this.router.navigateByUrl('/courses/list');
    });
  }
}
