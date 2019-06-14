import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';
import {forkJoin, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private searchService: SearchService) {
  }

  private artist = '';
  resultFromDeezer: ResultsListItem[];
  resultFromItunes: ResultsListItem[];
  mergedResult: ResultsListItem[];

  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    // this.searchService.getSearchFromDeezer(this.artist)
    //   .toPromise()
    //   .then(result =>
    //     this.resultFromDeezer = ProcessingResultsService.convertResultFromDeezer(result.data));
    //
    // this.searchService.getSearchFromItunes(this.artist)
    //   .toPromise()
    //   .then(result =>
    //     this.resultFromItunes = ProcessingResultsService.convertResultFromItunes(result.results));
    // console.log(this.resultFromDeezer, this.resultFromItunes);
    // const myFirstPromise = new Promise().then(console.log);
    const deezerSubscription = this.searchService.getSearchFromDeezer(this.artist).pipe(catchError(() => of([])));
    const itunesSubscription = this.searchService.getSearchFromItunes(this.artist).pipe(catchError(() => of([])));

    forkJoin([deezerSubscription, itunesSubscription])
      .subscribe(value => {
        // this.mergedResult = ProcessingResultsService.mergeData(this.resultFromDeezer, this.resultFromItunes);
      console.log(value);
    });


    // this.searchService.getSearchFromDeezer(this.artist).subscribe(result => {
    //   this.resultFromDeezer = ProcessingResultsService.convertResultFromDeezer(result.data);
    //   console.log(this.resultFromDeezer, 'deezer');
    //
    // });
    //
    // this.searchService.getSearchFromItunes(this.artist).subscribe(result => {
    //   this.resultFromItunes = ProcessingResultsService.convertResultFromItunes(result.results);
    //   console.log(this.resultFromItunes, 'itunes');
    // });
  }
}
