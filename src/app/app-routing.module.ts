import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/pages/index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'character-lists',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-list/characters-list.module'
      ).then((m) => m.CharactersListModule),
  },
  {
    path: 'characters-details/:id',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-details/characters-details.module'
      ).then((m) => m.CharactersDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
