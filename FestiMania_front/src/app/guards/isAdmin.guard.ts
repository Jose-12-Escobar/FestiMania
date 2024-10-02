import { CanActivateFn } from '@angular/router';



export const isAdminGuard: CanActivateFn = () => {

  //const _loclaStorageService = inject(LocalStorageService);

  /*if (_loclaStorageService.getItem('role') === 'ROLE_ADMIN') {
    return true;
  } else {
    return false;
  }*/
 return true
};
