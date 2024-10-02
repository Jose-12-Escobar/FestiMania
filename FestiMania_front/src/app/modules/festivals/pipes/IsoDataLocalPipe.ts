import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoDateLocal'
})
export class IsoDateLocalPipe implements PipeTransform {

  transform(value: Date | string): string {
    const dateObject = new Date(value); // Convertir el valor de entrada a un objeto Date

    // Obtener año, mes, día, hora, minutos y segundos manualmente
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');

    // Devolver el formato ISO sin ajustar a UTC
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}