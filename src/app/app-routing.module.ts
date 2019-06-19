import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultComponent} from './search-result/search-result.component';
import {SearchResultResolver} from './search-result/search-result-resolver.service';

const routes: Routes = [
  {
    path: 'search/:artist',
    component: SearchResultComponent,
    resolve: {
      resultsList: SearchResultResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
