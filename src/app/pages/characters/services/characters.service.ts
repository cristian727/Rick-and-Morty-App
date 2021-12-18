import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURLs } from '../../global/apiURL';
import { Character } from '../interface/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private charactersURL = apiURLs.characters;
  private characterURL = apiURLs.character;
  constructor(private http: HttpClient) {}

  getCharacters(pageNum: number): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.charactersURL}${pageNum}`);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.characterURL}${id}`);
  }
}
