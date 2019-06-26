import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  total1: number;
  currentPage1: number;
  peerPage1: number;

  @Input() set total(total: number) {
    this.total1 = total;
  }

  @Input() set currentPage(currentPage: number) {
    this.currentPage1 = currentPage;
  }
  @Input() set peerPage(peerPage: number) {
    this.peerPage1 = peerPage;
  }


  @Output() onPage = new EventEmitter<number>();
  @Output() onNext = new EventEmitter<number>();
  @Output() onPrev = new EventEmitter<number>();

  pagesNumbers: number[];

  constructor() { }

  ngOnInit() {
    this.pagesNumbers = this.initPagesArray();
  }

  private initPagesArray() {
    return Array(Math.ceil(this.total1 / this.peerPage1)).fill(1).map((item, index) => {
      return index + 1;
    });
  }

  paginationEnabled() {
    return this.total1 > this.peerPage1;
  }

  isFirst() {
    return this.currentPage1 === 1;
  }

  isLast() {
    return this.total1 === this.currentPage1;
  }

  get pagesArray() {
    return this.initPagesArray();
  }

  onPrevPressed() {
    this.onPrev.emit(this.currentPage1 - 1);
  }

  onPagePressed(page: number) {
    this.onPage.emit(page);
  }


  onNextPressed() {
    this.onNext.emit(this.currentPage1 + 1);
  }

  isCurrent(page: number) {
    return this.currentPage1 === page;
  }
}
