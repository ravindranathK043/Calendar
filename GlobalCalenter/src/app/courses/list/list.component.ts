import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCourses } from '../all-courses';
import { AllCoursesService } from '../all-courses.service';
import { Courses } from '../courses';
import { CoursesService } from '../courses.service';
import { Trainer } from '../trainer';
import { TrainerService } from '../trainer.service';
import { Userdetail } from '../userdetail';
import { UserdetailService } from '../userdetail.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  course: any;
  Coursesa: Courses[] = [];
  AllCou: AllCourses[] = [];
  AllUser: Userdetail[] = [];
  AllTrainer: Trainer[] = [];
  GetIUserss: any; startsDate: any; endsDate: any;
  myDate = new Date(); public dateFrom?: string;
  constructor(public coursesSer: CoursesService, public Allcourdet: AllCoursesService, public AllTrainerser: TrainerService, public router: Router) {
  }

  ngOnInit(): void {
    this.dateFrom = new Date().toISOString().split('T')[0];
    this.coursesSer.GetCourses().subscribe((data: Courses[]) => {
      this.Coursesa = data;
      this.course = data;
    });

    this.Allcourdet.getAllCourses().subscribe((data: AllCourses[]) => {
      this.AllCou = data;
    });
    this.AllTrainerser.getTrainer().subscribe((data: Trainer[]) => {
      this.AllTrainer = data;
    });
  }
  //------------Date serch---------
  selectdate(start: any, end: any) {
    if (start != "") {
      localStorage.setItem("startDate", JSON.stringify(start));
    }
    if (end != "") {
      localStorage.setItem("endDate", JSON.stringify(end));
    }
    
    this.endsDate = localStorage.getItem("endDate")?.replace(/^"|"$/g, '');
    this.startsDate = localStorage.getItem("startDate")?.replace(/^"|"$/g, '');
    
    this.Coursesa = this.course;

    if (this.endsDate != "undefined" && this.startsDate != "") {
      this.Coursesa = this.Coursesa.filter(m => (m.startDate > this.startsDate && m.startDate < this.endsDate) );
    } else {
      this.Coursesa = this.course;
    }
    
  }
  //-------Courses Search----------
  onCoursesSelected(value: string) {
    this.Coursesa = this.course;
    if (value == "")
      this.Coursesa = this.course;
    else
      this.Coursesa = this.Coursesa.filter((Coursesa) => Coursesa.course?.courserName == value);

  }
  //-------Trainer Search----------
  onTrainerSelected(value: string) {
    this.Coursesa = this.course;
    if (value == "")
      this.Coursesa = this.course;
    else
      this.Coursesa = this.Coursesa.filter((Coursesa) => Coursesa.trainer?.trainerName == value);
  }
  //-------Course Delete----------
  deleteCourses(id: any, username: any) {
    this.GetIUserss = localStorage.getItem("Users")?.replace(/^"|"$/g, '');
    if ((username === this.GetIUserss) || ("admin" === this.GetIUserss)) {
    this.coursesSer.deleteCourses(id).subscribe(res => {
      this.Coursesa = this.Coursesa.filter(item => item.id !== id);
    });
    }
    else
      alert("No valid User");
  }
   //-------Course Edit----------
  EditCourses(id: any, username: any) {
    this.GetIUserss = localStorage.getItem("Users")?.replace(/^"|"$/g, '');
   
    if (username === this.GetIUserss) {
      this.router.navigateByUrl('/courses/' + id + '/edit');
    } 
    else if ("admin" === this.GetIUserss) {
      this.router.navigateByUrl('/courses/' + id + '/edit');
    }
    else
      alert("No valid User");
  }
  DetailsCourses(id: any) {
    this.router.navigateByUrl('/courses/' + id + '/details');
  }


}


