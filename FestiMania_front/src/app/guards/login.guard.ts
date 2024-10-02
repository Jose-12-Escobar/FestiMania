import { CanActivateFn } from '@angular/router';


export const loginGuard: CanActivateFn = () => {

  //const _loclaStorageService = inject(LocalStorageService);

  /*if (_loclaStorageService.getItem('role')) {
    return true;
  } else {
    return false;
  }*/
 return true
};
