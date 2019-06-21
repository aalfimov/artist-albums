import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SearchService} from '../search.service';
import {SearchAlbumsComponent} from '../search/search-albums.component';

@Injectable({
  providedIn: 'root'
})
export class SearchResultResolver implements Resolve<Observable<ResultsListItem[]>> {

  constructor(private searchService: SearchService, private searchForm: SearchAlbumsComponent) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<ResultsListItem[]> {
    const searchName = route.queryParamMap.get('artistName');
    this.searchForm.updateValueFromUri(searchName);
    return this.searchService.getSearch(searchName);
  }
}
