import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataCheck} from './data-check';

// interface AlbumData {
//   link: string;
//   title: string;
//   artist: {
//     name: string;
//   };
//   album: {
//     cover: {
//       medium: string;
//     }
//   };
// }

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';
  // responseItunes: string[];
  constructor(private http: HttpClient) {
  }

  readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  private response: object;
  // private sortedResult: string[];
  // private artist: AlbumData;

  getSearch(artist: string) {
    // this.response = this.http.get<DataFilter>(this.DEEZER_URL + artist.toLowerCase());
    this.http.get<DataCheck>(this.DEEZER_URL + artist.toLowerCase())
      .subscribe(response => this.response = response);
  }
    //  .subscribe(response => this.response = response);
    // .subscribe(function(response) {
    //     this.response = response;
    //   });
    // this.sorting(this.response);
    // }
    // sorting(response: object): string[] {
    //   let sort: DataInterface;
    //   sort = function(response: DataInterface)
    //   console.log(response);
    //   return this.sortedResult;
    // }
  getResults() {
    return this.response;
  }
}
