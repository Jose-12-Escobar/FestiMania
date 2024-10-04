import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormService {

  constructor() {}

  noEsValido(formGroup: FormGroup, campo: string): boolean {
    return formGroup.controls[campo].touched && formGroup.controls[campo].invalid;
  }

  getMensaje(formGroup: FormGroup, campo: string): string {
    const error = formGroup.get(campo)?.errors;
    let msg: string = "";

    if (error?.['required']) {
      msg = 'El campo es obligatorio';
    } else if (error?.['minlength']) {
      msg = {
        nombre: "El mínimo de caracteres válido es 3",
        apellidos: "El mínimo de caracteres válido es 3",
        password: "El mínimo de caracteres válido es 8",
        username: "El mínimo de caracteres válido es 3",
        name: "El mínimo de caracteres válido es 3",
        city: "El mínimo de caracteres válido es 3",
        state: "El mínimo de caracteres válido es 3",
        country: "El mínimo de caracteres válido es 3",
      }[campo] || '';
    } else if (error?.['maxlength']) {
      msg = {
        nombre: "El máximo de caracteres válido es 30",
        apellidos: "El máximo de caracteres válido es 40",
        password: "El máximo de caracteres válido es 16",
        username: "El máximo de caracteres válido es 25",
        name: "El máximo de caracteres válido es 30",
        city: "El máximo de caracteres válido es 30",
        state: "El máximo de caracteres válido es 30",
        country: "El máximo de caracteres válido es 30",
      }[campo] || '';
    } else if (error?.['pattern']) {
      msg = 'No cumple el patrón estándar';
    }
    else if (error?.['fechaInferiorActual']) {
      msg = 'La fecha de inicio tiene que ser superior a la fecha actual.'
    }
    else if (error?.['fechaFinAnteriorOIgualFechaInicio']) {
      msg = 'La fecha de fin tiene que ser superior a la fecha de inicio.'
    }

    return msg;
  }
}
