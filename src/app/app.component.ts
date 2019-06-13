import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {ResultsListItem} from './interfaces/deezer-response.interface';
import {DeezerSearchItem} from './interfaces/deezer-search-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: SearchService) {
  }

  readonly ITUNES_URL = 'https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=';
  readonly DEEZER_URL = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=';
  private artist = '';
  result: ResultsListItem[];

  mergedResult: ResultsListItem[];


  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    this.service.getSearch(this.DEEZER_URL + this.artist).subscribe(result => {
      this.result = AppComponent.convertResult(result.data);
      console.log(this.result);
    });
  }

  private convertResult(data: DeezerSearchItem[]): ResultsListItem[] {
    return data.map(searchItem => {
      return {
        link: searchItem.link,
        title: searchItem.title,
        artistName: searchItem.artist.name,
        albumCover: searchItem.album.cover
      };
    });
  }
}
