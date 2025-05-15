import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';


export const authGuard: CanActivateFn = (route, state) =>{
 const authService = inject(AuthServiceService);
 const router = inject(Router);

  if (authService.isAuthenticated()) {		 
	return true;
  } else {
	return router.createUrlTree(['/login'])	
  }
}

export const authGuardLogin: CanActivateFn = (route, state) =>{
const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {		 
	return true;
  } else {
	return router.createUrlTree(['/dashboard'])	
  }
}

export const authGuardProject: CanActivateFn = (route, state) =>{
const authService = inject(AuthServiceService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {		 
	return true;
  } else {
	return router.createUrlTree(['/projects'])	
  }
}