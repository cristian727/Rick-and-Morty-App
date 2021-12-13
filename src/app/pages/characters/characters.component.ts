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
  anotherInfo!: Info;
  pageNum: number;

  constructor(private characterSvc: CharactersService) {
    this.pageNum = 1;
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
  }

  prevPage(){
    this.pageNum -= 1;
    this.getCharacters();
  }
}
