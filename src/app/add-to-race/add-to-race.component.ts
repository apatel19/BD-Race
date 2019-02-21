import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-to-race',
  templateUrl: './add-to-race.component.html',
  styleUrls: ['./add-to-race.component.css']
})

export class AddToRaceComponent {
// Getting data
  fireData: Observable<any[]>;
  passwordToRegister = '';
  fireDataToArray = [];
  pass = [];
  getRegistrationStatus: any;
  isRegistrationOpen = '';

// Storing data
  participantInfoRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private router: Router) {
      // To add data
      this.participantInfoRef = this.db.collection<any>('port');

      // To get data
      this.fireData = this.db.collection('Password').snapshotChanges().pipe(map(
        changes => {
          return changes.map(
            a => {
              const data = a.payload.doc.data() as any;
              data.id = a.payload.doc.id;
              return data;
            }
          );
        }
      ));

      this.getRegistrationStatus = this.db.collection('Registration').valueChanges();
      this.getRegistrationStatus.subscribe((data: { isOpen: string; }[]) => this.isRegistrationOpen = data[0].isOpen);
      this.getRegistrationStatus.subscribe(data => console.log(data));
      this.fireData.subscribe(data => this.fireDataToArray = data);
  }

  setPasswordToLocalVar () {
    this.pass = this.fireDataToArray.filter(data => data.id === 'ToRegister');
    this.passwordToRegister = this.pass[0].password;
  }

  checkPasswordValidator(password: string): boolean {
    this.setPasswordToLocalVar();
    if (this.passwordToRegister === '') {alert('Network issue: Unable to verify registration password.'); }
    if (password === this.passwordToRegister) { return true; } else { return false; }
  }

  addToDatabase(teamName: string, droneName: string, portId: string) {
  this.db.collection('port').doc(portId).set({
      teamName: teamName,
      droneName: droneName,
      portId: portId
    })
    .then((success) => {
      console.log('Added Data' + success);
      this.router.navigateByUrl('regular-user');
      return true;
    })
    .catch((error) => {
      console.error(error);
      alert('Coudnt save Data.Registration might closed.');
      return false;
    }
    );
  }

  registerToRace(form: NgForm) {

    if (!form.valid) {
      alert('Please enter in valid values in form.');
      return;
    }
    if (!this.checkPasswordValidator(form.value.password)) {
      alert('Password did not match! Ask someone for registration password.');
      return;
    }
    console.log('Registering...');
    if (this.isRegistrationOpen !== 'open') { alert('Registration is close. Ask Referee to open!'); return; }
    else { this.addToDatabase(form.value.teamName, form.value.droneName, form.value.portId); }
  }
}

