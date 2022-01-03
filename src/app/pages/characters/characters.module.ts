import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { CharacterComponent } from './character/character.component';
import { PagerComponent } from './pager/pager.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FormSearchComponent } from '../../shared/form-search/form-search.component';
import { FiltersComponent } from '../../shared/filters/filters.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    CharactersComponent,
    CharacterComponent,
    PagerComponent,
    HeaderComponent,
    FiltersComponent,
    FormSearchComponent,
  ],
  imports: [CommonModule, CharactersRoutingModule,FormsModule],
})
export class CharactersModule {}
