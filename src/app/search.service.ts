import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {Observable} from 'rxjs';
import {ItunesResponse} from './interfaces/itunes-response.interfase';
import {JsonpModule} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, private httpJsonp: JsonpModule) {
  }
  // readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  // readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';
  readonly DEEZER_URL = 'https://api.deezer.com/search&q=';
  readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search';

  getSearchFromDeezer(artist: string): Observable<DeezerResponse> {
    let params = new HttpParams();
    params = params.set('q', artist);
    return this.httpJsonp.jsonp<DeezerResponse>(this.DEEZER_URL, {params});
  }
  getSearchFromItunes(artist: string): Observable<ItunesResponse> {
    let params = new HttpParams();
    params = params.set('term', artist);
    return this.http.get<ItunesResponse>(this.ITUNES_URL, {params} );
  }
}
