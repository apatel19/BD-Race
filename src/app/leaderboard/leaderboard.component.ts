import { Component } from '@angular/core';

export interface LeaderBoardData {
  teamName: String;
  finishedTime: String;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css']
})


export class LeaderboardComponent {
  leaderBoard: LeaderBoardData[] = [
    {
      teamName: 'Team 1',
      finishedTime: '20.5s'
    },
    {
      teamName: 'Team 2',
      finishedTime: '22.5s'
    },
    {
      teamName: 'Team 3',
      finishedTime: '23.4s'
    },
    {
      teamName: 'Team 4',
      finishedTime: '24.4s'
    },
    {
      teamName: 'Team 5',
      finishedTime: '25.4s'
    },
    {
      teamName: 'Team 6',
      finishedTime: '26.4s'
    }
  ];

}
