import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, filter, map } from "rxjs";
import { CourseAPIInterface } from "../types/courseAPI.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environments";

@Injectable()
export class CourseService {
   courses$ = new Array<CourseAPIInterface>;

   constructor(private http: HttpClient) { }

   getCourses(): Observable<CourseAPIInterface> {
      const url = environment.apiUrl + '/courses';
      return this.http.get<CourseAPIInterface>(url);
   }
}