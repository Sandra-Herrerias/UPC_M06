import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-comments-feedback',
  templateUrl: './comments-feedback.component.html',
  styleUrls: ['./comments-feedback.component.css']
})
export class CommentsFeedbackComponent implements OnInit {

  comentarios: Object[] = [];

  constructor(private communicatorService: CommunicatorService) { }

  ngOnInit(): void {
    this.communicatorService.getData().subscribe(result => {
      console.log(result);
      this.comentarios.push(result);
    })
  }

}
