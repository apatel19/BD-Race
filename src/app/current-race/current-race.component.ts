import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
 import { CurrentRace } from '../current-race.model';
import { config } from '../current-race.config';
import { AngularFirestore } from '@angular/fire/firestore';

// export interface CurrentRaceData {
//   teamName: String;
//   currentPosition: Number;
// }

@Component({
  selector: 'app-current-race',
  templateUrl: './current-race.component.html',
  styleUrls: ['./current-race.component.css']
})

export class CurrentRaceComponent {
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  currentRace: Observable<any[]>;

   constructor(private db: AngularFirestore) {
    this.currentRace = this.db.collection(config.collection_endpoint).valueChanges();
   }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
   this.currentRace.subscribe(data => console.log(data));
  }

}
