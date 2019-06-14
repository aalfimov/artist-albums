import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {forkJoin, Observable, of} from 'rxjs';
import {ItunesResponse} from './interfaces/itunes-response.interfase';
import {catchError} from 'rxjs/operators';
import {ProcessingResultsService} from './processing-results.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, private processingService: ProcessingResultsService) {
  }

  readonly DEEZER_URL = 'https://api.deezer.com/search';
  readonly ITUNES_URL = 'https://itunes.apple.com/search';
  private mergedResult: ResultsListItem[];

  getSearchFromDeezer(artist: string): Observable<DeezerResponse> {
    return this.http.jsonp<DeezerResponse>(`${this.DEEZER_URL}?q=${artist}&output=jsonp`, 'callback');
  }

  getSearchFromItunes(artist: string): Observable<ItunesResponse> {
    return this.http.jsonp<ItunesResponse>(`${this.ITUNES_URL}?term=${artist}`, 'callback');
  }

  getSearch(artist: string) {

    const deezerSubscription = this.getSearchFromDeezer(artist).pipe(catchError(() => of({
      data: [],
      next: null,
      total: 0
    } as DeezerResponse)));
    const itunesSubscription = this.getSearchFromItunes(artist).pipe(catchError(() => of({
      resultCount: 0,
      results: []
    } as ItunesResponse)));

    forkJoin([deezerSubscription, itunesSubscription])
      .subscribe(response => {
        const deezer = response[0];
        const itunes = response[1];

        const normalizedData = [
          this.processingService.convertResultFromDeezer(deezer.data),
          this.processingService.convertResultFromItunes(itunes.results)
        ];

        console.log(normalizedData);

        this.mergedResult = this.processingService.mergeData(normalizedData[0], normalizedData[1]);

        console.log(this.mergedResult);
      });
    return this.mergedResult;
  }
}
