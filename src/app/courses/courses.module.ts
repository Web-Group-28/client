import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoursesComponent } from "./components/courses/courses.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
   {
      path: 'courses',
      component: CoursesComponent,
   }
]

@NgModule({
   imports: [CommonModule, RouterModule.forChild(routes)],
   declarations: [CoursesComponent],
})
export class CoursesModule { }