import { Component, OnDestroy, OnInit } from "@angular/core";
import { CourseAPIInterface } from "../../types/courseAPI.interface";
import { CourseService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { CourseInterface } from "../../types/course.interface";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css'],
    providers: [CourseService]
})
export class CoursesComponent implements OnInit, OnDestroy {
    courses: Array<CourseInterface> = [];
    constructor(private courseService: CourseService) { }
    async handle(observable: Observable<CourseAPIInterface>, apiResult: any) {
        observable.subscribe(r => {
            apiResult = r.data;
            for (let i = 0; i < r.data.length; i++) {
                this.courses.push({
                    _id: r.data[i]._id,
                    title: r.data[i].title,
                    courseID: r.data[i].courseID,
                    parts: r.data[i].parts
                });
            }
        })
    }
    async ngOnInit(): Promise<void> {
        const observable = this.courseService.getCourses();
        var apiResult = null;
        await this.handle(observable, apiResult);
        console.log("DONE")
        console.log(this.courses);
    }

    ngOnDestroy(): void {
    }
}