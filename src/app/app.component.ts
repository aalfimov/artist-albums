import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private service: SearchService) {
  }
  private artist = '';
  private result: object;
  ngOnInit() {
    console.log('let\'s start');
  }

  getSearch() {
    this.service.getSearch(this.artist);
    this.result = this.service.getResults();
    console.log(this.result);
  }
}