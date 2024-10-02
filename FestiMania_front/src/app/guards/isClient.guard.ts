import { CanActivateFn } from '@angular/router';

export const isClientGuard: CanActivateFn = () => {

 // const _loclaStorageService = inject(LocalStorageService);

  /*if (_loclaStorageService.getItem('role') === 'ROLE_USER') {
    return true;
  } else {
    return false;
  }*/ return true
};
