import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncodeService {

  constructor() { }

  // Codificar un string en Base64
  encodeData(data: string): string {
    return btoa(data);
  }

  // Decodificar un string de Base64
  decodeData(data: string): string {
    return atob(data);
  }
}
