import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../_models/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    baseUrl = environment.apiUrl;

    private currentUserSource = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSource.asObservable();
    constructor(private http: HttpClient) { }
    
    login(model: any) {
        return this.http.post<User>(this.baseUrl + 'auth/user-login', model).pipe(
            map((user: User) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        )
    }
    forget(email: any) {
        return this.http.post<User>(this.baseUrl + 'auth/send-reset-email/'+email,{});
    }

    register(model: any) {
        return this.http.post<User>(this.baseUrl + 'auth/user-signup', model).pipe(
            map((user) => {
                if (user) {
                    this.setCurrentUser(user);
                }
            })
        )
    }

    upload(formData: any) {
        return this.http.post(this.baseUrl + 'auth/upload-certificate', formData);
    }

    setCurrentUser(user: User) {
        user.roles = [];
        const roles = this.getDecodedToken(user.token).role;
        Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }

    getDecodedToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
    }
}