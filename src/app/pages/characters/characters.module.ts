import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterComponent } from './character/character.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
    declarations:[CharactersComponent, CharacterComponent, PagerComponent],
    imports:[CommonModule, CharactersRoutingModule]
})
export class CharactersModule{}
