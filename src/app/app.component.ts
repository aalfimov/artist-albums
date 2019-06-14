import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';
import {forkJoin, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProcessingResultsService} from './processing-results.service';
import {DeezerResponse} from './interfaces/deezer-response.interface';
import {ItunesResponse} from './interfaces/itunes-response.interfase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private searchService: SearchService, private processingService: ProcessingResultsService) {
  }

  private artist = '';
  mergedResult: ResultsListItem[];

  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {

    const deezerSubscription = this.searchService.getSearchFromDeezer(this.artist).pipe(catchError(() => of({
      data: [],
      next: null,
      total: 0
    } as DeezerResponse)));
    const itunesSubscription = this.searchService.getSearchFromItunes(this.artist).pipe(catchError(() => of({
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
  }
}
