import { Component, OnInit } from '@angular/core';
import { FestivalsService } from '../../services/festivals.service';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { Festival } from '../../models/festival-model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Genre } from '../../models/gener-model';

@Component({
  selector: 'details-festival',
  templateUrl: './details-festival.component.html',
  styleUrls: ['./details-festival.component.css']
})
export class DetailsFestivalComponent implements OnInit {

  festival !: Festival;
  festivalId !: string | null;
  formGroupEditFestival !: FormGroup;
  genresOption !: Genre[];

  constructor( public _show: SidebarService,
    private _festivals: FestivalsService,
    private route: ActivatedRoute,){
    _show.changeShowSidebar(true)
  }

  ngOnInit(): void {
    this.festivalId = this.route.snapshot.paramMap.get('id');
    this._festivals.getFestivalById(this.festivalId).subscribe({
      next: (res: Festival) => {
        this.festival = res;
      }
    });
  }


}
