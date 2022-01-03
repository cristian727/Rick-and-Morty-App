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
  anotherInfo!: Info;
  pageNum: number;
  name!: string;
  status!: string;
  gender!: string;

  constructor(
    private characterSvc: CharactersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageNum = 1;
    this.onUrlChange();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private getCharacters(): void {
    this.characterSvc
      .getCharacters(this.pageNum, this.name, this.status, this.gender)
      .pipe(take(1))
      .subscribe((resAPI) => {
        this.resAPI = resAPI;
        this.characters = this.resAPI.results;
        this.anotherInfo = this.resAPI.info;
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.name = params['name'];
      this.status = params['status'];
      this.gender = params['gender'];
      this.pageNum = params['page'];
      this.getCharacters();
    });
  }

  private onUrlChange(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.getCharactersByQuery();
        this.pageNum = 1;
      });
  }

  public goUp() {
    window.scrollTo(0, 0);
  }
}
