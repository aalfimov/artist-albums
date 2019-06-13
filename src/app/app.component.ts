import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {DeezerSearchItem} from './interfaces/deezer-search-item.interface';
import {ResultsListItem} from './interfaces/result-list-item.interface';
import {ItunesSearchItem} from './interfaces/itunes-search-item.interfase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: SearchService) {
  }

  private artist = '';
  resultFromDeezer: ResultsListItem[];
  resultFromItunes: ResultsListItem[];
  mergedResult = Array.prototype.push.apply(this.resultFromDeezer, this.resultFromItunes);


  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    this.service.getSearchFromDeezer(this.artist).subscribe(result => {
      this.resultFromDeezer = this.convertResultFromDeezer(result.data);
      console.log(this.resultFromDeezer);
    });
    this.service.getSearchFromItunes(this.artist).subscribe(result => {
      this.resultFromItunes = this.convertResultFromItunes(result.results);
      console.log(this.resultFromItunes);
    });
  }

  convertResultFromItunes(data: ItunesSearchItem[]): ResultsListItem[] {
    return data.map(searchItem => {
      return {
        link: searchItem.artistViewUrl,
        title: searchItem.collectionName,
        artistName: searchItem.artistName,
        albumCover: searchItem.artworkUrl100
      };
    });
  }

  convertResultFromDeezer(data: DeezerSearchItem[]): ResultsListItem[] {
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
