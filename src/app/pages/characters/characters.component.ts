import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Character } from './interface/character.interface';
import { Info } from './interface/info.interface';
import { CharactersService } from './services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  resAPI!: any;
  characters!: Character[];
  nextCharacters!: Character[];
  anotherInfo!: Info;
  pageNum: number;
  pages: number[];

  constructor(private characterSvc: CharactersService) {
    this.pageNum = 1;
    this.pages = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters() {
    this.characterSvc
      .getCharacters(this.pageNum)
      .pipe(
        tap((resAPI) => {
          this.resAPI = resAPI;
          this.characters = this.resAPI.results;
          this.anotherInfo = this.resAPI.info;
        })
      )
      .subscribe();
  }

  nextPage() {
    this.pageNum += 1;
    this.getCharacters();
    window.scrollTo(0, 0);
    this.defPagesNumber();
  }

  prevPage() {
    this.pageNum -= 1;
    this.getCharacters();
    window.scrollTo(0, 0);
  }

  goToPage(page: number) {
    this.pageNum = page;
    this.getCharacters();
    window.scrollTo(0, 0);
    this.defPagesNumber();
  }

  defPagesNumber() {
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
