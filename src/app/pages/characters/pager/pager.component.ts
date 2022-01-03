import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Info } from '../interface/info.interface';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css'],
})
export class PagerComponent implements OnInit {
  @Input() anotherInfo!: Info;
  @Output() seeInfoDetails = new EventEmitter<Info>();

  pageNum: number;
  pages: number[];

  constructor(private router: Router) {
    this.pageNum = 1;
    this.pages = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {}

  public nextPage(): void {
    this.pageNum += 1;
    window.scrollTo(0, 0);
    this.defPagesNumber();
    this.sendPageNumber();
  }

  public prevPage(): void {
    this.pageNum -= 1;
    window.scrollTo(0, 0);
    this.defPagesNumber();
    this.sendPageNumber();
  }

  public goToPage(page: number): void {
    this.pageNum = page;
    window.scrollTo(0, 0);
    this.defPagesNumber();
    this.sendPageNumber();
  }

  public sendPageNumber(): void {
    this.router.navigate(['/characters'], {
      queryParams: { page: this.pageNum },
    });
  }

  private defPagesNumber() {
    if (this.pageNum === 1) {
      this.pages = [1, 2, 3, 4, 5];
    } else {
      if (this.pageNum === this.pages[4]) {
        this.pages[0] = this.pages[3];
        this.pages[1] = this.pages[4];
        this.pages[2] = this.pages[1] + 1;
        this.pages[3] = this.pages[2] + 1;
        this.pages[4] = this.pages[3] + 1;
      }

      if (this.pageNum === this.pages[0]) {
        this.pages[4] = this.pages[1];
        this.pages[3] = this.pages[0];
        this.pages[2] = this.pages[3] - 1;
        this.pages[1] = this.pages[2] - 1;
        this.pages[0] = this.pages[1] - 1;
      }
    }
  }
}
