import {Component} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { LoginRequestInterface } from "../../types/loginRequest.interface";
import { Router } from "@angular/router";

@Component({
    selector: 'auth-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    errorMessage: string | null = null;
    form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

    onSubmit(): void {
        const formValue = this.form.value as LoginRequestInterface; 
        if (formValue.email && formValue.password) {
            this.authService.login(formValue).subscribe({
                next: (currentUser) => {
                    console.log('currentUser', currentUser);
                    this.authService.setToken(currentUser);
                    this.authService.setCurrentUser(currentUser);
                    this.errorMessage = null;
                    this.router.navigateByUrl('/');
                },
                error: (err: HttpErrorResponse) => {
                    console.log('err', err.error);
                    this.errorMessage = err.error.emailOrPassword;
                }
            });
        } else {
            console.log('Invalid form data');
        }
    }
}