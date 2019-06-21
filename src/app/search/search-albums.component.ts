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
  // route: ActivatedRouteSnapshot;

  constructor(private builder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  // getRout(route: ActivatedRouteSnapshot) {
  //   return route.queryParamMap.get('artistName');
  // }
  // this.route.params
  //   .switchMap((params: Params) => this.survey.getSurvey(params['artist']))
  //   .subscribe((survey: any) => {
  //     // update the form controls
  //   });
  private initForm() {
    this.searchForm = this.builder.group({
      artistName: ['', Validators.required]
    });
  }
  updateValueFromUri(artist: string) {
    this.searchForm.setValue({artistName: artist});
  }

  getSearch({value, valid}) {
    if (!valid) {
      console.error('invalid value');
      return;
    }
    this.searchPhrase.emit(value.artistName);
    // this.updateValueFromUri('abba');
  }
}
