import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { Genre } from '../../models/gener-model';
import { FestivalsService } from '../../services/festivals.service';
import { Festival } from '../../models/festival-model';
import { IsoDateLocalPipe } from '../../pipes/IsoDataLocalPipe';
import { ActivatedRoute } from '@angular/router';
import { ValidatorDate } from '../../validators/validatorDate';

@Component({
  selector: 'app-new-festinaval',
  templateUrl: './new-festinaval.component.html',
  styleUrls: ['./new-festinaval.component.css']
})
export class NewFestinavalComponent implements OnInit {

  formGroupNewFestival !: FormGroup;

  festival !: Festival;
  festivalEdit !: Festival;
  genresOption !: Genre[];
  festivalId !: string | null;

  constructor(public _show: SidebarService,
    private _fb: FormBuilder,
    private _festivals: FestivalsService,
    private isoDatePipe: IsoDateLocalPipe,
    private _messageService: MessageService,
    private route: ActivatedRoute,
  ) {
    _show.changeShowSidebar(true);
  }

  ngOnInit(): void {
    this.festivalId = this.route.snapshot.paramMap.get('id');
    if (this.festivalId) {
      this._festivals.getFestivalById(this.festivalId).subscribe({
        next: (res: Festival) => {
          this.festivalEdit = res;
          this.showFestivalInformation(this.festivalEdit);
        }
      });
    }
    this.loadinGenres();
    this.initFormNewFestival();
  }

  initFormNewFestival() {
    this.formGroupNewFestival = this._fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dateStart: [null, [Validators.required, ValidatorDate.DateLowerCurrent]],
      dateEnd: [null, [Validators.required,]],
      average: [null, [Validators.required]],
      currency: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
      country: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      state: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      genres: [null, [Validators.required]],
    }, {
      validators: ValidatorDate.fechaFinSuperiorFechaInicio('dateStart', 'dateEnd')
    });
  }

  showFestivalInformation(festivalEdit: Festival) {
    this.formGroupNewFestival.controls['name'].setValue(festivalEdit.name);
    this.formGroupNewFestival.controls['dateStart'].setValue(new Date(festivalEdit.dateStart));
    this.formGroupNewFestival.controls['dateEnd'].setValue(new Date(festivalEdit.dateEnd));
    this.formGroupNewFestival.controls['average'].setValue(festivalEdit.ticketPrice.average);
    this.formGroupNewFestival.controls['currency'].setValue(festivalEdit.ticketPrice.currency);
    this.formGroupNewFestival.controls['capacity'].setValue(festivalEdit.capacity);
    this.formGroupNewFestival.controls['country'].setValue(festivalEdit.location.country);
    this.formGroupNewFestival.controls['state'].setValue(festivalEdit.location.state);
    this.formGroupNewFestival.controls['city'].setValue(festivalEdit.location.city);
    this.formGroupNewFestival.controls['genres'].setValue(festivalEdit.genres.map(name => ({ name })));
  }

  loadinGenres() {
    this._festivals.getGenres().subscribe({
      next: (res: Genre[]) => {
        this.genresOption = res;
      }

    });
  }

  clearForm() {
    this.formGroupNewFestival.reset();
  }

  noEsValido(campo: string) {
    return this.formGroupNewFestival.controls[campo].touched && this.formGroupNewFestival.controls[campo].invalid;
  }

  getMensaje(campo: string): string {
    const error = this.formGroupNewFestival.get(campo)?.errors;
    let msg: string = "";

    if (error?.['required']) {
      msg = 'El campo es obligatorio';
    }
    else if (error?.['minlength']) {
      msg = "El mínimo de caracteres válido es 3";
    }
    else if (error?.['maxlength']) {
      msg = 'Exede el maximo de caracteres';
    }
    else if (error?.['fechaInferiorActual']) {
      msg = 'La fecha de inicio tiene que ser superior a la fecha actual.'
    }
    else if (error?.['fechaFinAnteriorOIgualFechaInicio']) {
      msg = 'La fecha de fin tiene que ser superior a la fecha de inicio.'
    }
    else if (error?.['menoriaEdad']) {
      msg = 'Debe ser mayor de edad.'
    }
    return msg;
  }


  guardarDatos() {
    if (this.formGroupNewFestival.invalid) {
      this.formGroupNewFestival.markAllAsTouched();
    } else {
      this.festival = {
        "name": this.formGroupNewFestival.get('name')?.value,
        "location": {
          "city": this.formGroupNewFestival.get('city')?.value,
          "state": this.formGroupNewFestival.get('state')?.value,
          "country": this.formGroupNewFestival.get('country')?.value
        },
        "dateStart": this.isoDatePipe.transform(this.formGroupNewFestival.get('dateStart')?.value),
        "dateEnd": this.isoDatePipe.transform(this.formGroupNewFestival.get('dateEnd')?.value),
        "ticketPrice": {
          "average": this.formGroupNewFestival.get('average')?.value,
          "currency": this.formGroupNewFestival.get('currency')?.value,
        },
        "capacity": this.formGroupNewFestival.get('capacity')?.value,
        "genres": this.formGroupNewFestival.get('genres')?.value.map((genre: Genre) => genre.name),
        "artists": this.festivalId ? this.festivalEdit.artists : []
      }

      if (this.festivalId) {
        this._festivals.updateFestival(this.festivalId, this.festival).subscribe({
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado con exito' });
            this.formGroupNewFestival.reset();
          },
          error: () => {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al editar el festival' });
          }
        })
      } else {
        this._festivals.saveFestival(this.festival).subscribe({
          next: () => {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado con exito' });
            this.formGroupNewFestival.reset();
          },
          error: () => {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear el festival' });
          }
        }
        )
      }


    }

  }
}
