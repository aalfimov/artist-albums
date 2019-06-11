import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  artist = '';
  result: string[];
  constructor(private search: SearchService) {
  }

  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    this.search.getSearch();
    this.result = this.search.result;
    console.log(this.result);
  }
}
