import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { FestivalsService } from '../../services/festivals.service';
import { Festival } from '../../models/festival-model';

@Component({
  selector: 'app-list-festival',
  templateUrl: './list-festival.component.html',
  styleUrls: ['./list-festival.component.css']
})
export class ListFestivalComponent implements OnInit {

  festivals !: Festival[];

  constructor( public _show: SidebarService,
    private _festivals: FestivalsService,){
    _show.changeShowSidebar(true)
  }

  ngOnInit(): void {
    this._festivals.getAllFestivals().subscribe({
      next: (res: Festival[]) => {
        this.festivals = res;
        console.log('todos los festivales:', this.festivals)
      }
    });
  }
}
