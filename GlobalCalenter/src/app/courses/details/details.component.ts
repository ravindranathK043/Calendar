
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from "../courses";
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id!: number;
  courses!: Courses ;

  constructor(public courseServier: CoursesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['courseId'];
    this.courseServier.GetCoursesById(this.id).subscribe((data: Courses) => {
      this.courses = data;
    });
  }

}
