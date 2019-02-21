import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentRace } from '../current-race.model';
import { config } from '../current-race.config';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

export interface CurrentRaceData {
  teamName: String;
  currentPosition: Number;
  buttonId: String;
}

@Component({
  selector: 'app-referee-user',
  templateUrl: './referee-user.component.html',
  styleUrls: ['referee-user.component.css']
})

export class RefereeUserComponent {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  currentRace: Observable<any[]>;
  color = 'accent';
  isChecked = false;
  disabled = false;
  registration = 'Registration is NOT OPEN.';
  stat = '';
  isAuth = false;

   registrationStatusInfoRef: AngularFirestoreCollection<any>;


  constructor(private db: AngularFirestore) {
    this.registrationStatusInfoRef = this.db.collection<any>('Registration');
    this.currentRace = this.db.collection(config.collection_endpoint).valueChanges();
    console.log(sessionStorage.getItem('isAuth'));
    if (sessionStorage.getItem('isAuth') !== null && sessionStorage.getItem('isAuth') !== 'false') {
      this.isAuth = true;
      console.log('isAuth is: ' + this.isAuth);
    } else {
      this.isAuth = false;
      console.log('isAuth is: ' + this.isAuth);
    }
  }

   checkRefereeAuth(referee: NgForm) {
    console.log('TAPPED');
    if (referee.value.refereeAuth === 'IamReferee') {
      this.isAuth = true;
      sessionStorage.setItem('isAuth', 'true');
      console.log(this.isAuth);
    } else {
      this.isAuth = false;
      sessionStorage.setItem('isAuth', 'false');
      console.log(this.isAuth);
    }
   }



   stopButtonTapped(portId: string) {
     console.log(portId + ' STOP');
   }

   toggleRegistration(x: { checked: boolean; }) {
      console.log(x.checked);
      if (x.checked) {
        this.stat = 'open';
      } else {
        this.stat = 'close';
      }
      this.changeRegistrationStatus(this.stat);
     }

   changeRegistrationStatus(status: string) {
      this.db.collection('Registration').doc('CheckStatus').set({
      isOpen: status
    })
    .then((success) => {
      this.registration = 'Registration is ' + status + '.';
      return true;
    })
    .catch((error) => {
      console.error(error);
      this.registration = 'Registration is close.';
      alert('Coudnt Open Registration.' + error);
      return false;
    }
    ); }
   }
