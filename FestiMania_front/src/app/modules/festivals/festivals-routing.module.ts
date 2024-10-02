import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewFestinavalComponent } from './component/new-festinaval/new-festinaval.component';
import { PageHomeMenuComponent } from './component/page-home-menu/page-home-menu.component';
import { ListFestivalComponent } from './component/list-festival/list-festival.component';
import { DetailsFestivalComponent } from './component/details-festival/details-festival.component';
import { AddSubArtistFestivalComponent } from './component/add-sub-artist-festival/add-sub-artist-festival.component';

const routes: Routes = [
  { path: 'new', component: NewFestinavalComponent },
  { path: 'home', component: PageHomeMenuComponent },
  { path: 'list', component: ListFestivalComponent },
  { path: 'edit/:id', component: NewFestinavalComponent},
  { path: 'details/:id', component: DetailsFestivalComponent},
  { path: 'addSubArtist/:id', component: AddSubArtistFestivalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivalsRoutingModule { }
