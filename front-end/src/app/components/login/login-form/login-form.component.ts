import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserCircle, heroLockClosed } from '@ng-icons/heroicons/outline';
import { AuthServiceService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule,NgIcon], 
  providers: [provideIcons({heroUserCircle, heroLockClosed})], 
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private authService = inject(AuthServiceService)

  loginForm?: FormGroup | any;

  constructor(private form: FormBuilder) {
    this.loginForm = this.form.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit() {}




  login(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
      }
    }); 

  }

}
