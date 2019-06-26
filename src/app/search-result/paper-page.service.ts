import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Paginator} from '../interfaces/paginator.interface';

@Injectable({
  providedIn: 'root'
})
export class PaperPageService {

  constructor() {
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range((currentPage - 1) * pageSize,
      Math.min(startIndex + pageSize - 1, totalItems - 1) + 1);
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    } as Paginator;
  }
}
