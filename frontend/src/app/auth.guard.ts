import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const role = localStorage.getItem('userRole');
  const token = localStorage.getItem('jwtToken');

  if (token && role) {
    
    return true;
  } else {
    
    
    return false;
  }

};