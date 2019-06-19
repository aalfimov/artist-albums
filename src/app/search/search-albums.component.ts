import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-album',
  templateUrl: './search-albums.component.html',
  styleUrls: ['./search-albums.component.scss']
})
export class SearchAlbumsComponent implements OnInit {

  @Output() searchPhrase = new EventEmitter<string>();

  searchForm: FormGroup;
  artistName: string;

  constructor(private builder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
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
    this.searchPhrase.emit(value.artistName);
  }
}
