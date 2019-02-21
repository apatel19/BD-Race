import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegularUserComponent } from './regular-user/regular-user.component';
import { RefereeUserComponent } from './referee-user/referee-user.component';
import { AddToRaceComponent } from './add-to-race/add-to-race.component';

const routes: Routes = [
  { path: '', component: RegularUserComponent},
  { path: 'regular-user', component: RegularUserComponent},
  { path: 'referee-user', component: RefereeUserComponent},
  { path: 'add-to-race', component: AddToRaceComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
