import {Component, OnInit} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-album',
  templateUrl: './search-albums.component.html',
  styleUrls: ['./search-albums.component.scss']
})
export class SearchAlbumsComponent implements OnInit {
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
    // this.router.navigateByUrl();
    this.searchService.getSearch(value.artistName).subscribe(searchResult => {
      this.result = searchResult;
    });
  }
}
