import { CanActivateFn } from '@angular/router';
import { SessionStorageService } from '../modules/auth/services/session-storage.service';
import { inject } from '@angular/core';


export const loginGuard: CanActivateFn = () => {

  const _sessionStorage = inject(SessionStorageService);

  if (_sessionStorage.getItem('usuario')) {
    return true;
  } else {
    return false;
  }
};
