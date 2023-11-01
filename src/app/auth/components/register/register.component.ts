import {Component} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { Router } from "@angular/router";

@Component({
    selector: 'auth-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    errorMessage: string | null = null;
    form = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        const formValue = this.form.value as RegisterRequestInterface; 
        if (formValue.email && formValue.username && formValue.password) {
            this.authService.register(formValue).subscribe({
                next: (currentUser) => {
                    console.log('currentUser', currentUser);
                    this.authService.setToken(currentUser);
                    this.authService.setCurrentUser(currentUser);
                    this.errorMessage = null;
                    this.router.navigateByUrl('/');
                },
                error: (err: HttpErrorResponse) => {
                    console.log('err', err.error);
                    this.errorMessage = err.error.join(', ');
                }
            });
        } else {
            console.log('Invalid form data');
        }
    }
}