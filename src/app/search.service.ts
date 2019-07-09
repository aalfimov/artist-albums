import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {forkJoin, Observable, of} from 'rxjs';
import {ItunesResponse} from './interfaces/itunes-response.interfase';
import {catchError, map} from 'rxjs/operators';
import {ProcessingResultsService} from './processing-results.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  readonly DEEZER_URL = 'https://api.deezer.com/search';
  readonly ITUNES_URL = 'https://itunes.apple.com/search';
  private mergedResult: ResultsListItem[] = [];
  private artist: string;

  constructor(private http: HttpClient, private processingService: ProcessingResultsService) {
  }

  getSearch(artist: string) {
    if (artist === this.artist && !!this.mergedResult.length) {
      return of([...this.mergedResult]);
    }
    this.artist = artist;

    const deezerSubscription = this.getSearchDataFromDeezer(artist).pipe(catchError(() => of({
      data: [],
      next: null,
      total: 0
    } as DeezerResponse)));
    const itunesSubscription = this.getSearchDataFromItunes(artist).pipe(catchError(() => of({
      resultCount: 0,
      results: []
    } as ItunesResponse)));

    return forkJoin([deezerSubscription, itunesSubscription]).pipe(map(response => {
      const deezer = response[0];
      const itunes = response[1];

      const normalizedData = [
        this.processingService.convertResultFromDeezer(deezer.data),
        this.processingService.convertResultFromItunes(itunes.results)
      ];
      this.mergedResult = this.processingService.mergeData(normalizedData[0], normalizedData[1]);
      return this.mergedResult;
    }));
  }

  getSearchDataFromDeezer(artist: string): Observable<DeezerResponse> {
    return this.http.jsonp<DeezerResponse>(`${this.DEEZER_URL}?q=${artist}&output=jsonp`, 'callback');
  }

  getSearchDataFromItunes(artist: string): Observable<ItunesResponse> {
    return this.http.jsonp<ItunesResponse>(`${this.ITUNES_URL}?term=${artist}`, 'callback');
  }
}
