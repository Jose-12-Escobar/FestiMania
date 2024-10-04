import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EncodeService } from 'src/app/modules/auth/services/encode.service';
import { SessionStorageService } from 'src/app/modules/auth/services/session-storage.service';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})

export class SidebarComponent implements OnInit {

  _sessionStorage = inject(SessionStorageService);
  _encode = inject(EncodeService);
  items !: MenuItem[];
  roles: String[] = [];

  constructor() {
  }

  ngOnInit() {
    const userEncode = this._sessionStorage.getItem('usuario')
    if (userEncode) {
      this.roles.push((JSON.parse(this._encode.decodeData(userEncode))).roles)
    }
    this.items = [
      {
        label: 'Festivales',
        visible:['ROLE_ADMIN','ROLE_USER'].some( (role) => this.roles.includes(role) ),
        items: [
          { label: 'Nuevo', visible:['ROLE_ADMIN'].some( (role) => this.roles.includes(role) ), icon: 'pi pi-plus-circle', routerLink: '/festival/new', styleClass: "text-decoration-none" },
          { label: 'Lista', visible:['ROLE_ADMIN','ROLE_USER'].some( (role) => this.roles.includes(role) ), icon: 'pi pi-list', routerLink: '/festival/list' },
        ]
      },
      {
        //visible: ['ROLE_ADM', 'ROLE_OPG', 'ROLE_CON', 'ROLE_CER', 'ROLE_OPC', 'ROLE_GES'].some((perm)=> permiso.includes(perm)),
        label: 'Artistas',
        visible:['ROLE_ADMIN'].some( (role) => this.roles.includes(role) ),
        items: [
          { label: 'Añadir', icon: 'pi pi-plus-circle', routerLink: ['/festival/addSubArtist', 'add'] },
          { label: 'Eliminar', icon: 'pi pi-minus-circle', routerLink: ['/festival/addSubArtist', 'sub'] },
        ]
      },
    ];
  }

}
