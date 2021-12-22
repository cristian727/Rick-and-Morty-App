import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take, tap } from 'rxjs/operators';
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
  name!: string;
  status!: string;
  species!: string;
  type!: string;
  gender!: string;

  constructor(
    private characterSvc: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageNum = 1;
    this.pages = [1, 2, 3, 4, 5];
    this.onUrlChange();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private getCharacters(): void {
    this.characterSvc
      .getCharacters(
        this.pageNum,
        this.name,
        this.status,
        this.species,
        this.type,
        this.gender
      )
      .pipe(take(1))
      .subscribe((resAPI) => {
        this.resAPI = resAPI;
        this.characters = this.resAPI.results;
        this.anotherInfo = this.resAPI.info;
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.name = params['q'];
      this.getCharacters();
    });
  }

  private onUrlChange(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        console.log('sí estoy pasando', this.characters);
        this.getCharactersByQuery();
        this.pageNum = 1;
        this.pages = [1, 2, 3, 4, 5];
      });
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
