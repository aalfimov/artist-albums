import {DeezerSearchItem} from './deezer-search-item.interface';

export interface DeezerResponse {
  data: DeezerSearchItem[];
  next: string;
  total: number;
}

export interface ResultsListItem {
  link: string;
  title: string;
  artistName: string;
  albumCover: string;
}
