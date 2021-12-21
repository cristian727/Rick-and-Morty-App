import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  template: `
    <input
      #inputSearch
      autofocus
      type="text"
      placeholder="Search..."
      (keyup)="onSearch(inputSearch.value)"
    />
  `,
  styleUrls: ['./form-search.component.css'],
})
export class FormSearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(value: string) {
    if (value && value.length > 3) {
      this.router.navigate(['/characters'], {
        queryParams: { q: value },
      });
    }
  }
}
