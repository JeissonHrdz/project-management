import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from "./components/login/login-form/login-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginFormComponent, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
