import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GlobalCalenter';
  pipe = new DatePipe('en-US');
  now = Date.now();
  mySimpleFormat = this.pipe.transform(this.now, 'MM/dd/yyyy');
}
