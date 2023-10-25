import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailRegex } from 'src/app/_constants/app-constants';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  selectedFile!: File;
 
  constructor(private authService: AuthService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.form = this.fb.group({
      fullName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(EmailRegex)]],
      password: ["", Validators.required],
      confirmPassword: [""],
      gender: ["Male"],
      dateOfBirth: ["", Validators.required],
      caste: ["Open", Validators.required],
      certificate: [""],
      address: ["", Validators.required],
      country: ["India", Validators.required],
      phoneNumber: ["", Validators.required],
      otherPhoneNumber: [""]
    },
    { Validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(f: FormGroup) {
    return f.get("password")?.value === f.get("confirmPassword")?.value
      ? null
      : { mismatch: true };
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
    }
  }

  submit() {
    if (!this.form.valid)
      this.toastr.error("Please fill all the details");

    if (!this.selectedFile)
      this.toastr.error("Please upload your caste certificate");

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.authService.upload(formData).subscribe({
      next: (response: any) => {
        this.form.get('certificate')?.setValue(response.dbPath);
        this.authService.register(this.form.value).subscribe({
          next: () => {
            this.toastr.success("You have registered successfully.");
            this.router.navigateByUrl('/home');
          },
          error: (error) => {
            console.log(error);
          }
        });
      },
      error: (error) => {
        this.toastr.error(error);
        console.log(error);
      }
    });
  }
}
