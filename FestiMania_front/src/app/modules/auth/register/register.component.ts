import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { passwordMatchValidator } from '../validator/validatorPassword';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { RegisterIn } from '../models/register-model';
import { ValidationFormService } from 'src/app/Services/validationForm.service';
import { EncodeService } from '../services/encode.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroupRegister !: FormGroup;
  dataUser !: RegisterIn;
  passwordClick : boolean = true;

  constructor( public _show: SidebarService,
              private _fb: FormBuilder,
              private _authService: AuthService,
              private _messageService: MessageService,
              private _validationForm: ValidationFormService ){
    _show.changeShowSidebar(false)
  }

  ngOnInit(): void {
    this.initFormRegister();
  }

  initFormRegister() {
    this.formGroupRegister = this._fb.group({
      nombre: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellidos: [null, [Validators.required,  Validators.minLength(3), Validators.maxLength(40)]],
      username:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: [null, [Validators.required]]
    },{
      validator: passwordMatchValidator('password', 'confirmPassword')
    }
    );
  }

  noEsValido(campo: string) {
    return this._validationForm.noEsValido(this.formGroupRegister, campo)
  }

  getMensaje(campo: string): string {
    return this._validationForm.getMensaje(this.formGroupRegister, campo);
  }


  register(){
    if (this.formGroupRegister.invalid) {
          this.formGroupRegister.markAllAsTouched();

        }else{
          this.dataUser = {
            "name": this.formGroupRegister.get('nombre')?.value,
            "lastname": this.formGroupRegister.get('apellidos')?.value,
            "username": this.formGroupRegister.get('username')?.value,
            "email": this.formGroupRegister.get('email')?.value,
            "password": this.formGroupRegister.get('password')?.value
          }
          this._authService.register(this.dataUser).subscribe({
            next: (res) => {
              this._messageService.add({ severity: 'success', summary: 'Genial', detail: 'Se ha realizado el registro correctamente' });
              this.formGroupRegister.reset()
            },
            error: () => {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Verifique los datos e intentelo de nuevo' });
            }
          })

        }
}

passwordVisibility() {
  this.passwordClick = !this.passwordClick
}
}
