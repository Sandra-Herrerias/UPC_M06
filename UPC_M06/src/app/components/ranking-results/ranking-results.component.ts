import { CommunicatorService } from 'src/app/service/communicator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking-results',
  templateUrl: './ranking-results.component.html',
  styleUrls: ['./ranking-results.component.css']
})
export class RankingResultsComponent implements OnInit {

  dataRanking: any;
  p: number = 1;
  ipp: number = 5;
  constructor(private communicatorService: CommunicatorService) { }

  ngOnInit(): void {
    this.communicatorService.getRanking().subscribe(
      result => { this.dataRanking = result; console.log(this.dataRanking) }
    );
  }

}
