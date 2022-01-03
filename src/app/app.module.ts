import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { HttpClientModule } from '@angular/common/http';
// import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
// import { FormsModule } from '@angular/forms';
// import { FiltersComponent } from './shared/filters/filters.component';
// import { FormSearchComponent } from './shared/form-search/form-search.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    // HeaderComponent,
    FooterComponent,
    // FiltersComponent,
    // FormSearchComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
