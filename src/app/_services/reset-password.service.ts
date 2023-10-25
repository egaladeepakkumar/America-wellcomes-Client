import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../_models/reset-password.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post(this.baseUrl + 'auth/send-reset-email', email);
  }

  resetEmail(resetPasswordObj: ResetPassword) {
    return this.http.post<any>(`${this.baseUrl}/reset-email`, resetPasswordObj);
  }
}