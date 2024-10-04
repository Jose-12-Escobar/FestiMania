import { Component, inject, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { FestivalsService } from '../../services/festivals.service';
import { Festival } from '../../models/festival-model';
import { EncodeService } from 'src/app/modules/auth/services/encode.service';
import { SessionStorageService } from 'src/app/modules/auth/services/session-storage.service';

@Component({
  selector: 'app-list-festival',
  templateUrl: './list-festival.component.html',
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit {

  _sessionStorage = inject(SessionStorageService);
  _encode = inject(EncodeService);
  festivals !: Festival[];
  isAdmin: boolean = false;

  constructor(public _show: SidebarService,
    private _festivals: FestivalsService,) {
    _show.changeShowSidebar(true)
  }

  ngOnInit(): void {
    this.isAdmin = JSON.parse(this._encode.decodeData(this._sessionStorage.getItem('usuario'))).roles === 'ROLE_ADMIN';

    this._festivals.getAllFestivals().subscribe({
      next: (res: Festival[]) => {
        this.festivals = res;
      }
    });
  }
}
