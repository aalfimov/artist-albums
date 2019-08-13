import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-album',
  templateUrl: './search-albums.component.html',
  styleUrls: ['./search-albums.component.scss']
})
export class SearchAlbumsComponent implements OnInit, OnDestroy {

  @Output() searchPhrase = new EventEmitter<string>();

  searchForm: FormGroup;
  artistName: string;
  color = '#503264';

  constructor(private builder: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.route.queryParamMap.subscribe(params => {
      this.updateValue(params.get('artistName'));
    });
  }

  private initForm() {
    this.searchForm = this.builder.group({
      artistName: ['', Validators.required]
    });
  }

  updateValue(artist: string) {
    return this.searchForm.setValue({artistName: artist});
  }

  getSearch({value, valid}) {
    if (!valid) {
      console.error('invalid value');
      return;
    }
    this.searchPhrase.emit(value.artistName);
  }

  ngOnDestroy() {
    this.searchPhrase.unsubscribe();
  }
}
