import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
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
  query!: string;

  constructor(
    private characterSvc: CharactersService,
    private route: ActivatedRoute
  ) {
    this.pageNum = 1;
    this.pages = [1, 2, 3, 4, 5];
  }

  ngOnInit(): void {
    this.getCharacters();
    this.getCharactersByQuery();
  }

  private getCharacters(): void {
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

  private getCharactersByQuery(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.query = params['q'];
    });

    this.characterSvc
      .getCharacterByName(this.query)
      .pipe(
        tap((resApi) => {
          console.log(resApi);
          this.resAPI = resApi;
          this.characters = this.resAPI.results;
        })
      )
      .subscribe();
  }

  public nextPage(): void {
    this.pageNum += 1;
    this.getCharacters();
    window.scrollTo(0, 0);
    this.defPagesNumber();
  }

  public prevPage(): void {
    this.pageNum -= 1;
    this.getCharacters();
    window.scrollTo(0, 0);
  }

  public goToPage(page: number): void {
    this.pageNum = page;
    this.getCharacters();
    window.scrollTo(0, 0);
    this.defPagesNumber();
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
