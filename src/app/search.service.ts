import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface DataFilter {
  data: {
    link: string;
    title: string;
    artist: {
      name: string;
    }
    album: {
      cover: {
        medium: string;
      }
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';
  // responseItunes: string[];

  constructor(private http: HttpClient) {
  }

  readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  response: object;

  getSearch(artist: string) {
    // this.response = this.http.get<DataFilter>(this.DEEZER_URL + artist.toLowerCase());
    this.http.get<DataFilter>(this.DEEZER_URL + artist.toLowerCase())
      .pipe().subscribe(response => this.response = response);
  }
}
