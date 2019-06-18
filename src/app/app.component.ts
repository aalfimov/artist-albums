import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private searchService: SearchService) {
  }

  private artist = '';
  mergedSortedResult: ResultsListItem[];

  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    this.mergedSortedResult = this.searchService.getSearch(this.artist);
  }
}
