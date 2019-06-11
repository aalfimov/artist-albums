import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  // readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';
  artist = '';
  // response: string[];
  // responseItunes: string[];
  result: any;

  constructor(private http: HttpClient) {
  }

  getSearch() {
    this.http.get(this.DEEZER_URL + this.artist.toLowerCase())
      .subscribe((response) => {
        this.result = response;
        console.log(this.result);
      });
  }
}
