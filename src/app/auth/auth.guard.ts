import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES_APP } from '../core/enum/routes.enum';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem('angular17token');
  console.log('LOCAL DATA: ', localStorage.getItem('angular17token'))
  if (localData) {
    return true;
  } else {  
    router.navigateByUrl(ROUTES_APP.LOGIN)
    return false;
  }
};
