import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  cour!: Courses;
  courses: AllCourses[] = []; user: Userdetail[] = []; trainer: Trainer[] = [];
  createForm: any; msg!: string;
  form: FormGroup = new FormGroup({}); public dateFrom?: string;
  editForm: any; public dateStart?: string; public dateEnd?: string; public Timing?: string;

  constructor(public courseSer: CoursesService,
    public allCour: AllCoursesService,
    public AllUser: UserdetailService, public allTrainer: TrainerService,
    private route: ActivatedRoute,
    private router: Router,
   
    private fromBuilder: FormBuilder) {
    this.editForm = this.fromBuilder.group({
         id: [''],
        courseId: ['', Validators.required],
        preRequisite: ['', Validators.required],
        duration: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        timings: ['', Validators.required],
        linkToJoin: ['', Validators.required],
        userId: ['', Validators.required],
        trainerId: ['', Validators.required]
      }); }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['courseId'];
   
    this.allCour.getAllCourses().subscribe((data: AllCourses[]) => {
      this.courses = data;
    });
    this.AllUser.getUser().subscribe((data: Userdetail[]) => {    
      var Name = localStorage.getItem("Users")?.replace(/^"|"$/g, '');
      if (Name == "admin" || Name == "")
        this.user = data.filter(x => x.userId != 1);
      else
        this.user = data.filter(x => x.userName == Name && x.userId != 1);

    });
    this.allTrainer.getTrainer().subscribe((data: Trainer[]) => {
      this.trainer = data;
    });

    this.courseSer.GetCoursesById(this.id).subscribe((data: Courses) => {      
      this.cour = data;
      this.editForm.patchValue(data);
      this.dateStart = data.startDate.toString().split('T')[0];
      this.dateEnd = data.endDate.toString().split('T')[0];
      this.Timing = data.timings.toString().split('T')[1];
      
      //alert(data.timings);
    });
    this.dateFrom = new Date().toISOString().split('T')[0];
  }
  onSubmit(formData: { value: any; }) {
    this.courseSer.updateCourses(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('/courses/list');
    });
  }
}
