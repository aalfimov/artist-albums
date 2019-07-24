import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SearchAlbumsComponent} from './search/search-albums.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {JwPaginationComponent} from 'jw-angular-pagination';
import {SearchResultPageComponent} from './search-result/search-result-page/search-result-page.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {ColorPickerModule} from 'ngx-color-picker';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SearchAlbumsComponent,
    SearchResultComponent,
    JwPaginationComponent,
    SearchResultPageComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
