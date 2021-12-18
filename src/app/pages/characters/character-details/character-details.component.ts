import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Character } from '../interface/character.interface';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
})
export class CharacterDetailsComponent implements OnInit {
  character!: Character;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private characterSvc: CharactersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getCharacter(id);
    });
  }

  getCharacter(id: number) {
    this.characterSvc
      .getCharacter(id)
      .pipe(
        tap((resApi) => {
          this.character = resApi;
        })
      )
      .subscribe();
  }
}
