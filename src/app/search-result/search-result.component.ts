import {Component, OnInit} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  allItems: ResultsListItem[] = [];
  pageOfItems: ResultsListItem[];
  currentPage = 1;
  itemsPeerPage = 6;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeDataSubscription();
  }

  private getPageFromRoute() {
    const page = parseInt(this.route.snapshot.queryParamMap.get('page'), 10);
    if (page && page <= this.getPagesCount()) {
      this.currentPage = +page;
    }
  }

  private routeDataSubscription() {
    this.route.data.subscribe(data => {
      this.allItems = data.resultsList;
      this.getPageFromRoute();
      this.selectDataFromResult(this.currentPage);
    });
  }

  get currentPageList(): ResultsListItem[] {
    return this.pageOfItems;
  }

  getTotal() {
    return this.allItems.length;
  }

  pagePressed(page: number) {
    this.loadPage(page);
  }

  nextPressed(page: number) {
    this.currentPage += 1;
    this.loadPage(page);
  }

  prevPressed(page: number) {
    this.currentPage -= 1;
    this.loadPage(page);
  }

  loadPage(pageNumber: number) {
    this.router.navigate([], {
      queryParams: {page: pageNumber},
      queryParamsHandling: 'merge'
    });
  }

  getPagesCount() {
    return Math.ceil(this.allItems.length / this.itemsPeerPage);
  }

  getSkip(page): number {
    return ((page - 1) * this.itemsPeerPage);
  }

  selectDataFromResult(page: number) {
    this.pageOfItems = this.allItems.slice(this.getSkip(page), this.getSkip(page) + this.itemsPeerPage);
  }

}
