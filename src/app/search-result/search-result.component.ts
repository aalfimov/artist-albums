import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {PaperPageService} from './paper-page.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  allItems: ResultsListItem[] = [];
  pageOfItems: ResultsListItem[];
  currentPage = 1;
  itemsPeerPage = 5;
  totalPages: number;


  // pager: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeDataSubscription();
    this.getPageFromRoute();



    // this.arrayOfPages = Array.apply(null, {
    //   length: Math.ceil(this.allItems.length / this.pageSize + 1)
    // }).map(Number.call, Number);
    // this.arrayOfPages.splice(0, 1);
    //
    // this.setPage(this.initialPage);
  }

  private getPageFromRoute() {
    const page = this.route.snapshot.queryParamMap.get('page');
    if (page) {
      this.currentPage = +page;
    }
  }

  private routeDataSubscription() {
    this.route.data.subscribe(data => {
      this.allItems = data.resultsList;
      // this.totalPages = this.getTotal();
    });
  }

  private setPage(page: number) {
    // if (page < 1 || page > this.pager.totalPages) {
    //   return;
    // }
    // this.changePage.emit(this.pageOfItems);
    //
    // this.pager = this.paper.getPager(this.allItems.length, page);
    //
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  get currentPageList(): ResultsListItem[] {
    return [];
  }

  getTotal() {
    return this.allItems.length;
  }

  getPeerPage() {
    return Math.ceil(this.allItems.length / this.itemsPeerPage);
  }

  pagePressed(page: number) {
    // this.currentPage = this.loadPage(page);
  }

  nextPressed(page: number) {

  }

  prevPressed(page: number) {

  }

  loadPage(pageNumber: number) {
    this.router.navigate([], {
      queryParams: {page: pageNumber},
      queryParamsHandling: 'merge'
    });
  }
}
