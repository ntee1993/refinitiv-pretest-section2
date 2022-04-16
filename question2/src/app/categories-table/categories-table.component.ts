import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent implements OnInit {
  li: any;
  list = [''];
  filterInput: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://api.publicapis.org/categories')
      .subscribe((Response) => {
        this.li = Response;
        this.list = this.li.categories;
      });
  }

  listFilter() {
    const strInclude = RegExp(`${this.filterInput}`, 'i');
    this.list = this.li.categories;
    if (this.filterInput !== '')
      this.list = this.list.filter((str) => strInclude.test(str));
  }
}
