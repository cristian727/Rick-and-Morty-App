import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiURLs } from '../../global/apiURL';
import { Character } from '../interface/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private charactersURL = apiURLs;

  constructor(private http: HttpClient) {}

  getCharacters(
    pageNum: number,
    name = '',
    status = '',
    species = '',
    type = '',
    gender = ''
  ): Observable<Character[]> {
    return this.http.get<Character[]>(
      `${this.charactersURL.characters}${pageNum}&name=${name}&status=${status}&specie=${species}&type=${type}&gender=${gender}`
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.charactersURL.character}${id}`);
  }

  // getCharacterByName(name : string): Observable<Character[]>{
  //   return this.http.get<Character[]>(`${this.charactersURL.charactersByName}${name}`)
  // }
}
