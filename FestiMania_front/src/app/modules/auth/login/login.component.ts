import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { AuthService } from '../services/auth.service';
import { LoginIn } from '../models/login-model';
import { MessageService } from 'primeng/api';
import { SessionStorageService } from '../services/session-storage.service';
import { EncodeService } from '../services/encode.service';
import { ValidationFormService } from 'src/app/Services/validationForm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroupLogin !: FormGroup;
  dataUser !: LoginIn;
  emailOrUsername: boolean = true;
  fcnemailOrUsername: string = 'email';
  passwordClick : boolean = true;

  constructor(public _showSB: SidebarService,
    private _fb: FormBuilder,
    private _router: Router,
    private _auth: AuthService,
    private _message: MessageService,
    private _sessionStorage: SessionStorageService,
    private _encode: EncodeService,
    private _validationForm: ValidationFormService  ) {
    _showSB.changeShowSidebar(false)
  }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.formGroupLogin = this._fb.group({
      email: [null, [Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      username: [null, [Validators.minLength(3), Validators.maxLength(25)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  noEsValido(campo: string) {
    return this._validationForm.noEsValido(this.formGroupLogin, campo)
  }

  getMensaje(campo: string): string {
    return this._validationForm.getMensaje(this.formGroupLogin, campo);
  }

  login() {

    if (this.formGroupLogin.invalid) {
      this.formGroupLogin.markAllAsTouched();
    } else {
      this.dataUser = {
        "usernameOrEmail": this.emailOrUsername ? this.formGroupLogin.get('email')?.value : this.formGroupLogin.get('username')?.value,
        "password": this.formGroupLogin.get('password')?.value,
      }

      this._auth.login(this.dataUser).subscribe({
        next: (res) => {
          const userEncode = this._encode.encodeData(JSON.stringify(res))
          this._sessionStorage.setItem('usuario', userEncode)
          this._router.navigate(['/festival/home']);
        },
        error: (err) => {
          this._message.add({ severity: 'error', summary: 'Credenciales erróneas', detail: 'No existe ninguna usuario con los datos introducidos' });
        }
      })
    }
  }

  isEmail() {
    this.emailOrUsername = true;
    this.fcnemailOrUsername = 'email';
    this.formGroupLogin.reset();
  }

  isUsername() {
    this.emailOrUsername = false;
    this.fcnemailOrUsername = 'username';
    this.formGroupLogin.reset();
  }

  passwordVisibility() {
    this.passwordClick = !this.passwordClick
  }
}
