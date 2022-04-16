import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from './categories';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
  categories: Categories | any;
  list = [''];
  filterInput: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http
      .get('https://api.publicapis.org/categories')
      .subscribe((Response) => {
        this.categories = Response;
        this.list = this.categories.categories;
      });
  }

  listFilter() {
    const strInclude = RegExp(`${this.filterInput}`, 'i');
    this.list = this.categories.categories;
    if (this.filterInput !== '')
      this.list = this.list.filter((str) => strInclude.test(str));
  }
}
