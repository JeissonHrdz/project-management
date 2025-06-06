import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from "./components/login/login-form/login-form.component";
import { MainMenuComponent } from "./components/dashboard/main-menu/main-menu.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid, heroXCircleSolid, heroInformationCircleSolid, heroExclamationCircleSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIcon, MainMenuComponent],  
  providers: [provideIcons({ heroCheckCircleSolid, heroXCircleSolid, heroInformationCircleSolid, heroExclamationCircleSolid })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
