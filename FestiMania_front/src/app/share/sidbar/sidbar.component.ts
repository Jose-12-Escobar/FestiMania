import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidbar',
  templateUrl: './sidbar.component.html',
  styleUrls: ['./sidbar.component.css']
})

export class SidebarComponent implements OnInit {

  items !: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Festivales',
        items: [
          { label: 'Nuevo', icon: 'pi pi-plus-circle', routerLink: '/festival/new', styleClass: "text-decoration-none"},
          { label: 'Lista', icon: 'pi pi-list', routerLink: '/festival/list'},
        ]
      },
      {
        label: 'Artistas',
        items: [
          { label: 'Añadir', icon: 'pi pi-plus-circle', routerLink: ['/festival/addSubArtist', 'add']},
          { label: 'Eliminar', icon: 'pi pi-minus-circle', routerLink:  ['/festival/addSubArtist', 'sub']},
        ]
      },
    ];
  }

}
