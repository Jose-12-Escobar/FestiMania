import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { Festival } from 'src/app/modules/festivals/models/festival-model';
import { FestivalsService } from 'src/app/modules/festivals/services/festivals.service';



@Component({
  selector: 'app-festivalsRecent',
  templateUrl: './festivalsRecent.component.html',
  styleUrls: ['./festivalsRecent.component.css']
})
export class FestivalsRecent implements OnInit {

  festivals !: Festival[];

 constructor(public _showSB: SidebarService,
            private _festivals: FestivalsService) {
  _showSB.changeShowSidebar(false)
 }

 ngOnInit(): void {
  this._festivals.getFestivalsRecent().subscribe({
    next: (res: Festival[]) => {
      this.festivals = res;
    }

  });
}

}
