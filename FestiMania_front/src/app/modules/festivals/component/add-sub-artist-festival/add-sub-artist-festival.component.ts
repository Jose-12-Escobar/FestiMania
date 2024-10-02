import { Component, OnInit } from '@angular/core';
import { Festival } from '../../models/festival-model';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { FestivalsService } from '../../services/festivals.service';
import { ArtistsService } from '../../services/artists.service';
import { Artist } from '../../models/artist-model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-sub-artist-festival',
  templateUrl: './add-sub-artist-festival.component.html',
  styleUrls: ['./add-sub-artist-festival.component.css']
})
export class AddSubArtistFestivalComponent implements OnInit {

  festivals !: Festival[];
  artists !: Artist[];
  artistsOptions : {name: string, id: string}[] = [];
  selectedOption !: {name: string, id: string} | null;
  paramRoute !: string | null;

  constructor(public _show: SidebarService,
    private _festivals: FestivalsService,
    private _artists: ArtistsService,
    private _messageService: MessageService,
    private route: ActivatedRoute,) {
    _show.changeShowSidebar(true)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.paramRoute = params.get('id');
    })
    console.log('param:', this.paramRoute)
    this._artists.getAllArtists().subscribe({
      next: (res: Artist[]) => {
        this.artists = res;
        this.artists.map( (artist) => {this.artistsOptions.push({name: artist.name, id: artist.id})})
      }
    });
    this._festivals.getAllFestivals().subscribe({
      next: (res: Festival[]) => {
        this.festivals = res;
      }
    });

  }

  addArtist(artistId: string, festivalId: string) {
    this._festivals.addArtist(festivalId, artistId).subscribe({
      next: (res: Festival) => {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Artista añadido' });
        console.log('artista añadido al festival:', res);
        this.selectedOption=null;
        this._festivals.getAllFestivals().subscribe({
          next: (res: Festival[]) => {
            this.festivals = res;
          }
        });
      },
      error: (error) => {
        if (error.status === 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'El artista ya esta incluido en el festival' });
        }
        this.selectedOption=null;
      }
    });
  }

  subArtist(artistId: string, festivalId: string){
    this._festivals.subArtist(festivalId, artistId).subscribe({
      next: (res: Festival) => {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Artista eliminado' });
        this.selectedOption=null;
        console.log('res de eliminar:', res)
        this._festivals.getAllFestivals().subscribe({
          next: (res: Festival[]) => {
            this.festivals = res;
          }
        });
      },
      error: (error) => {
        if (error.status === 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'El artista no esta incluido en el festival' });
        }
        this.selectedOption=null;
      }
    });
  }

}
