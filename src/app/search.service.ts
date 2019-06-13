import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getSearch(uri: string): Observable<DeezerResponse> {
    return this.http.get<DeezerResponse>(uri.toLowerCase());
  }
}
