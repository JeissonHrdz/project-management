import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircle, heroLockClosed } from '@ng-icons/heroicons/outline';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UserLoginDTO } from '../../../core/model/dto/user-login-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  providers: [provideIcons({ heroUserCircle, heroLockClosed })],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private authService = inject(AuthServiceService)

  loginForm?: FormGroup | any;
  errorInput: boolean = true;
  responseMessage: string = '';

  constructor(private form: FormBuilder, private router: Router) {
    this.loginForm = this.form.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as UserLoginDTO).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          this.responseMessage = "Invalid username or password";
          console.error('Login error:', error.message);
          this.errorInput = false;
        },
        complete: () => {
          console.log('Login request completed');
          this.router.navigate(['/dashboard']);
          this.errorInput = false;
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();    
      $('#username').addClass('is-invalid');
      $('#password').addClass('is-invalid');
      this.responseMessage = "Please fill in all fields correctly";
      this.errorInput = false;
    }

  }

  hasErrors(controlName: string, errorType: string) {
    return (
      this.loginForm.get(controlName)?.hasError(errorType)
      && this.loginForm.get(controlName)?.touched
    )
  }

}
