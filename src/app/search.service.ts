import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {Observable} from 'rxjs';
import {ItunesResponse} from './interfaces/itunes-response.interfase';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }
  readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';

  getSearchFromDeezer(artist: string): Observable<DeezerResponse> {
    return this.http.get<DeezerResponse>(this.DEEZER_URL + artist.toLowerCase());
  }
  getSearchFromItunes(artist: string): Observable<ItunesResponse> {
    return this.http.get<ItunesResponse>(this.ITUNES_URL + artist.toLowerCase());
  }
}
