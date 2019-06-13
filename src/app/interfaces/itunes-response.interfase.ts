import {ItunesSearchItem} from './itunes-search-item.interfase';

export interface ItunesResponse {
  results: ItunesSearchItem[];
  resultCount: number;
}
