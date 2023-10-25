import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private toastr: ToastrService
    ) {}

    canActivate(): Observable<boolean> {
        return this.authService.currentUser$.pipe(
            map((user) => {
                if (user) return true;
                else {
                    this.toastr.error("You are not allowed to view this link!");
                    return false;
                }   
            })
        );
    }
}