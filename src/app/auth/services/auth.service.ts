import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, filter, map } from "rxjs";
import { CurrentUserInterface } from "../types/currentUser.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environments";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable()
export class AuthService {
    currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
        undefined
    );
    isLogged$ = this.currentUser$.pipe(filter(currentUser => currentUser !== undefined), map(Boolean)
    );

    constructor(private http: HttpClient) {}

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/token';
        return this.http.get<CurrentUserInterface>(url);
    }

    register(registerRequest: RegisterRequestInterface): Observable<CurrentUserInterface> {
        console.log('a');
        const url = environment.apiUrl + '/register';
        return this.http.post<CurrentUserInterface>(url, registerRequest);
    }

    login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
        console.log('a');
        const url = environment.apiUrl + '/login';
        return this.http.post<CurrentUserInterface>(url, loginRequest);
    }

    setToken(currentUser: CurrentUserInterface): void {
        console.log('b');
        localStorage.setItem('token', currentUser.token);
    }

    setCurrentUser(currentUser: CurrentUserInterface | null): void {
        this.currentUser$.next(currentUser);
    }
}