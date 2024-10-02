import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { Festival } from '../models/festival-model';
import { Genre } from '../models/gener-model';

@Injectable({
  providedIn: 'root'
})
export class FestivalsService {

  baseUrl !: string;

  constructor(private http: HttpClient,  private _baseUrl: ApiService) {
    this.baseUrl = `${this._baseUrl.getBaseUrl()}/festivals`;
  }


  getFestivalsRecent(): Observable<Festival[]> {
    return this.http.get<Festival[]>(`${this.baseUrl}/recent`)
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}/genres`)
  }

  saveFestival(newFestival: Festival): Observable<Festival> {
    return this.http.post<Festival>(this.baseUrl, newFestival)
  }

  getAllFestivals(): Observable<Festival[]> {
    return this.http.get<Festival[]>(this.baseUrl)
  }

  getFestivalById(id: string | null): Observable<Festival> {
    return this.http.get<Festival>(`${this.baseUrl}/${id}`)
  }

  updateFestival(id: string, editFestival: Festival): Observable<Festival> {
    return this.http.put<Festival>(`${this.baseUrl}/${id}`, editFestival)
  }

  addArtist(idFestival: string, idArtist: string): Observable<Festival> {
    return this.http.get<Festival>(`${this.baseUrl}/${idFestival}/artist/${idArtist}`)
  }

  subArtist(idFestival: string, idArtist: string): Observable<Festival> {
    return this.http.delete<Festival>(`${this.baseUrl}/${idFestival}/artist/${idArtist}`)
  }

}
