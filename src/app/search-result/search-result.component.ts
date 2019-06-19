import {Component, OnInit} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  result: ResultsListItem[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.result = data.resultsList;
    });
  }

  noData() {
    return !this.result.length;
  }
}
