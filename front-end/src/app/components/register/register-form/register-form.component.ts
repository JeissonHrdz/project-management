import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  responseMessage: string = '';
  errorInput: boolean = true;
  authService = inject(AuthServiceService)

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password_hash: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }); 
  }

  hasErrors(controlName: string, error: string): boolean {
    const control = this.registerForm.get(controlName);
    return control?.hasError(error) && (control?.dirty || control?.touched) || false;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userData } = this.registerForm.value;
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Register error:', error.message);
          this.responseMessage = 'Registration failed! Please try again.';
          this.errorInput = false;
        },
        complete: () => {
          this.responseMessage = 'Registration successful! Redirecting to login...';
          this.errorInput = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      })
    } else {
      this.responseMessage = 'Please fill in all required fields correctly.';
      this.errorInput = true;
    }
  }
}
