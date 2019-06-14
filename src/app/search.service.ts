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
  readonly DEEZER_URL = 'https://api.deezer.com/search';
  readonly ITUNES_URL = 'https://itunes.apple.com/search';

  getSearchFromDeezer(artist: string): Observable<DeezerResponse> {
    return this.http.jsonp<DeezerResponse>(`${this.DEEZER_URL}?q=${artist}&output=jsonp`, 'callback');
  }
  getSearchFromItunes(artist: string): Observable<ItunesResponse> {
    return this.http.jsonp<ItunesResponse>(`${this.ITUNES_URL}?term=${artist}`, 'callback');
  }
}
