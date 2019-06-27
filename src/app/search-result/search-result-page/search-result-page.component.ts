import {Component, Input, OnInit} from '@angular/core';
import {ResultsListItem} from '../../interfaces/result-list-item.interface';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.scss']
})
export class SearchResultPageComponent implements OnInit {

  resultsList: ResultsListItem[] = [];

  @Input() set list(items: ResultsListItem[]) {
    this.resultsList = items;
  }

  constructor() {
  }

  ngOnInit() {
  }

  noData() {
    return !this.resultsList.length;
  }

}
