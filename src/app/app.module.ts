import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { MatToolbarModule,
         MatButtonModule,
         MatListModule,
         MatIconModule,
         MatTableModule,
         MatSidenavModule,
         MatSlideToggleModule,
         MatGridListModule,
       } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrentRaceComponent } from './current-race/current-race.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RegularUserComponent } from './regular-user/regular-user.component';
import { RefereeUserComponent } from './referee-user/referee-user.component';
import { AddToRaceComponent } from './add-to-race/add-to-race.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentRaceComponent,
    LeaderboardComponent,
    RegularUserComponent,
    RefereeUserComponent,
    AddToRaceComponent
    ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'brainDroneRace'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
