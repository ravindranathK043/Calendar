import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses/login', pathMatch: 'full' },
  { path: 'courses/login', component: LoginComponent },
  { path: 'courses/list', component: ListComponent },
  { path: 'courses/:courseId/details', component: DetailsComponent },
  { path: 'courses/create', component: CreateComponent },
  { path: 'courses/:courseId/edit', component: EditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
