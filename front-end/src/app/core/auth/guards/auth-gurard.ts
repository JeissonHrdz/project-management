import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    private authService = inject(AuthServiceService)

  constructor(private router: Router) {}
  canActivate(route: any, state: any): boolean {
	const isAuthenticated = this.authService.isAuthenticated(); // Assuming this method returns a boolean
	if (!isAuthenticated) {
	  this.router.navigate(['/']); 
	  return false;
	} 
	return true; 
  }
}