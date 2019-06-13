import {DeezerSearchItem} from './deezer-search-item.interface';

export interface DeezerResponse {
  data: DeezerSearchItem[];
  next: string;
  total: number;
}
