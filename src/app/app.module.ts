import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { CharactersComponent } from './components/characters/characters.component';

// import {} from './components/pages/characters/character.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormSearchComponent } from './shared/form-search/form-search.component';
import { IndexComponent } from './components/pages/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    // CharactersComponent,
    HeaderComponent,
    FormSearchComponent,
    IndexComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
