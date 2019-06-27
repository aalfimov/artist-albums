import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  total: number;
  currentPage: number;
  peerPage: number;

  @Input() set setTotal(total: number) {
    this.total = total;
  }

  @Input() set setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

  @Input() set setPeerPage(peerPage: number) {
    this.peerPage = peerPage;
  }

  @Output() onPage = new EventEmitter<number>();
  @Output() onNext = new EventEmitter<number>();
  @Output() onPrev = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
    this.initPagesArray();
  }

  private initPagesArray() {
    return Array(Math.ceil(this.total / this.peerPage)).fill(1).map((item, index) => {
      return index + 1;
    });
  }

  isOnFirst() {
    return this.currentPage === 1;
  }

  isOnLast() {
    return this.initPagesArray().length === this.currentPage;
  }

  get pagesArray() {
    return this.initPagesArray();
  }

  onPrevPressed() {
    this.onPrev.emit(this.currentPage - 1);
  }

  onPagePressed(page: number) {
    this.onPage.emit(page);
  }

  onNextPressed() {
    this.onNext.emit(this.currentPage + 1);
  }

  isCurrent(page: number) {
    return this.currentPage === page;
  }
}
