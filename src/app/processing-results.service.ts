import {Injectable} from '@angular/core';
import {DeezerSearchItem} from './interfaces/deezer-search-item.interface';
import {ResultsListItem} from './interfaces/result-list-item.interface';
import {ItunesSearchItem} from './interfaces/itunes-search-item.interfase';

@Injectable({
  providedIn: 'root'
})
export class ProcessingResultsService {

  constructor() { }

  convertResultFromItunes(data: ItunesSearchItem[]) {
    return data.map(searchItem => {
      return {
        link: searchItem.artistViewUrl,
        title: searchItem.collectionName,
        artistName: searchItem.artistName,
        albumCover: searchItem.artworkUrl100
      } as ResultsListItem;
    });
  }
  convertResultFromDeezer(data: DeezerSearchItem[]) {
    return data.map(searchItem => {
      return {
        link: searchItem.link,
        title: searchItem.title,
        artistName: searchItem.artist.name,
        albumCover: searchItem.album.cover
      } as ResultsListItem;
    });
  }

  mergeData(resultFromDeezer: ResultsListItem[], resultFromItunes: ResultsListItem[]) {
    // return resultFromDeezer.concat(resultFromItunes);
    // return push.apply(resultFromDeezer, resultFromItunes);
    return [...resultFromDeezer, ...resultFromItunes];
  }
}
