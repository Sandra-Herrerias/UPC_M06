import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-comments-feedback',
  templateUrl: './comments-feedback.component.html',
  styleUrls: ['./comments-feedback.component.css']
})
export class CommentsFeedbackComponent implements OnInit {

  dataComments:any;

  constructor(private communicatorService: CommunicatorService) { }

  ngOnInit(): void {
    this.communicatorService.getComments().subscribe(
      result => {
        this.dataComments=result;}
    );
    console.log("DATA COMMENTS");
    console.log(this.dataComments);
  }

}
