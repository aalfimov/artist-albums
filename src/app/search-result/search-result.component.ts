import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResultsListItem} from '../interfaces/result-list-item.interface';
import {ActivatedRoute} from '@angular/router';
import {PaperPageService} from './paper-page.service';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  allItems: ResultsListItem[];
  pagedItems: ResultsListItem[];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 5;
  arrayOfPages: [];
  pageOfItems: ResultsListItem[];
  pager: any = {};

  constructor(private route: ActivatedRoute, private paper: PaperPageService) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allItems = data.resultsList;
    });

    this.arrayOfPages = Array.apply(null, {
      length: Math.ceil(this.allItems.length / this.pageSize + 1)
    }).map(Number.call, Number);
    this.arrayOfPages.splice(0, 1);

    this.setPage(this.initialPage);
  }

  private setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.changePage.emit(this.pageOfItems);

    this.pager = this.paper.getPager(this.allItems.length, page);

    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  noData() {
    return !this.allItems.length;
  }
}
