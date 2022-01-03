import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  status: string = '';
  specie: string = '';
  gender: string = '';

  public onSubmit() {
    console.log(this.status);
    this.router.navigate(['/characters'], {
      queryParams: { status: this.status, gender: this.gender },
    });
  }
}
