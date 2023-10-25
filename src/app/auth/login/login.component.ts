import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';
import { ResetPasswordService } from 'src/app/_services/reset-password.service';
declare let Email: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  resetPasswordEmail: string = '';
  message!: string;

  constructor(private authService: AuthService, private resetPasswordService: ResetPasswordService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('IsLogin')){
      this.router.navigateByUrl('/home');
    }
    else
    {
      this.createLoginForm();
    }
  }

  createLoginForm() {
    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  submit() {
    if (!this.form.valid)
      this.toastr.error("Please fill the required fields");
    
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.toastr.success("Logged In successfully");
        localStorage.setItem('IsLogin','True');
        this.router.navigateByUrl('/home');
      }
    })
  }
 

  public isValidEmail!: boolean;
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  confirmToReset() {
    debugger;
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.authService.forget(this.resetPasswordEmail)
        .subscribe({
          next: (res: any) => {
            if(res.status == 'Succeeded')
            {
              Email.send({
                Host: 'smtp.elasticemail.com',
                port: 2525,
                Username: 'Medtrack@medtrack.tech',
                Password: '6CD4B73A999F929167A00B01AAAEFBA2DCAF',
                To: res.mailModel.toMail,
                From: 'Medtrack@medtrack.tech',
                Subject: res.mailModel.mailSubject,
                Body: res.mailModel.mailBody,
              });
              this.toastr.info('Password sent to Email: ' +
              res.mailModel.toMail +
              ' please check your (Inbox/Spam) !!!');
            }
            else{
              this.toastr.error(res.status);
            }
          },
          error: () => {
            this.toastr.error("Something went wrong!");
          }
          
        })
        const buttonRef = document.getElementById("closeBtn");
        buttonRef?.click();
    }
  }
}
