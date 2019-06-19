import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SearchService} from '../search.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultResolver implements Resolve<Observable<ResultsListItem[]>> {

  constructor(private searchService: SearchService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ResultsListItem[]> {
    const searchName = route.paramMap.get('artist');
    return this.searchService.getSearch(searchName);
  }
}
