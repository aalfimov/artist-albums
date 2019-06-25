import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {
  items: ResultsListItem[];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 0;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  numberOfPages: [];

  result: ResultsListItem[];
  pager: any = {};
  // private allItems: any[];
  pageOfItems: ResultsListItem[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.result = data.resultsList;
    });
    this.numberOfPages = Array.apply(null, {length:
        Math.ceil(this.result.length / 5)}).map(Number.call, Number);
    this.items = this.result;
    if (this.items) {
      this.setPage(this.initialPage);
    }
  }

  noData() {
    return !this.result.length;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  // onChangePage(pageOfItems: Array<any>) {
  //   // update current page of items
  //   this.pageOfItems = pageOfItems;
  //   console.log(this.pageOfItems);
  // }
  private setPage(page: number) {
    this.initialPage = page;
    // // get new pager object for specified page
    // this.pager = this.paginate(this.items.length, page, this.pageSize, this.maxPages);
    //
    // // get new page of items from items array
    // this.pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    //
    // // call change page function in parent component
    // this.changePage.emit(this.pageOfItems);
  }

  private paginate(length: number, page: number, pageSize: number, maxPages: number) {
    return;
  }

  // paginate(
  //   totalItems: number,
  //   currentPage: number = 1,
  //   pageSize: number = 10,
  //   maxPages: number = 10
  // ) {
  //   // calculate total pages
  //   const totalPages = Math.ceil(totalItems / pageSize);
  //
  //   // ensure current page isn't out of range
  //   if (currentPage < 1) {
  //     currentPage = 1;
  //   } else if (currentPage > totalPages) {
  //     currentPage = totalPages;
  //   }
  //
  //
  //   let startPage: number, endPage: number;
  //   if (totalPages <= maxPages) {
  //     // total pages less than max so show all pages
  //     startPage = 1;
  //     endPage = totalPages;
  //   } else {
  //     // total pages more than max so calculate start and end pages
  //     const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
  //     const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
  //     if (currentPage <= maxPagesBeforeCurrentPage) {
  //       // current page near the start
  //       startPage = 1;
  //       endPage = maxPages;
  //     } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
  //       // current page near the end
  //       startPage = totalPages - maxPages + 1;
  //       endPage = totalPages;
  //     } else {
  //       // current page somewhere in the middle
  //       startPage = currentPage - maxPagesBeforeCurrentPage;
  //       endPage = currentPage + maxPagesAfterCurrentPage;
  //     }
  //   }
  //
  //   // calculate start and end item indexes
  //   const startIndex = (currentPage - 1) * pageSize;
  //   const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  //
  //   // create an array of pages to ng-repeat in the pager control
  //   const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
  //
  //   // return object with all pager properties required by the view
  //   return {
  //   '{totalItems}': totalItems,
  //     '{currentPage}': currentPage,
  //     '{pageSize}': pageSize,
  //     '{totalPages}': totalPages,
  //     '{startPage}': startPage,
  //     '{endPage}': endPage,
  //     '{startIndex}': startIndex,
  //     '{endIndex}': endIndex,
  //     '{pages}': pages
  //   };
  // }
}
