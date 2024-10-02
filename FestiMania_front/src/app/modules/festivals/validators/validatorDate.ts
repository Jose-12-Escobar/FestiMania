import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ValidatorDate {

    static DateLowerCurrent(control: AbstractControl): { [key: string]: boolean } | null {
        const fecha = control.value;

        if (fecha) {
            const fechaInicio = new Date(fecha);
            const fechaActual = new Date();

            // Quitar la parte de la hora para comparar solo la fecha
            fechaInicio.setHours(0, 0, 0, 0);
            fechaActual.setHours(0, 0, 0, 0);

            if (fechaInicio <= fechaActual) {
                return { 'fechaInferiorActual': true }
            }
        }
        return null;
    };

    static fechaFinSuperiorFechaInicio(startControlName: string, endControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const startControl = formGroup.get(startControlName);
            const endControl = formGroup.get(endControlName);

            if (startControl && endControl) {
                const startDate = new Date(startControl.value);
                const endDate = new Date(endControl.value);

                if (startDate && endDate && endDate <= startDate) {
                    endControl.setErrors({ fechaFinAnteriorOIgualFechaInicio: true });
                    return { 'fechaFinAnteriorOIgualFechaInicio': true }; // Indica que hay un error
                } else {
                    endControl.setErrors(null); // No hay error
                }
            }

            return null; // No hay errores
        };
    }
}