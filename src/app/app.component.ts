import {Component, OnInit} from '@angular/core';
import {SearchService} from './search.service';
import {ResultsListItem} from './interfaces/result-list-item.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  result: ResultsListItem[];

  searchForm: FormGroup;

  constructor(private searchService: SearchService,
              private builder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    console.log('let\'s start');
  }

  private initForm() {
    this.searchForm = this.builder.group({
      artistName: ['', Validators.required]
    });

  }

  getSearch({value, valid}) {
    if (!valid) {
      console.error('invalid value');
      return;
    }
    this.searchService.getSearch(value.artistName).subscribe(searchResult => {
      this.result = searchResult;
    });
  }
}
