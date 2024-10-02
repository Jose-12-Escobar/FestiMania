import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { Artist } from '../models/artist-model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  baseUrl !: string;

  constructor(private http: HttpClient,  private _baseUrl: ApiService) {
    this.baseUrl = `${this._baseUrl.getBaseUrl()}/artists`;
  }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.baseUrl)
  }

}
