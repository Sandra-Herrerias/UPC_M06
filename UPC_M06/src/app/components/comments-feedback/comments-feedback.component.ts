import { firstValueFrom } from 'rxjs';
import { Player } from './../../model/player';
import { Comment } from './../../model/comment';
import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from 'src/app/service/communicator.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments-feedback',
  templateUrl: './comments-feedback.component.html',
  styleUrls: ['./comments-feedback.component.css']
})
export class CommentsFeedbackComponent implements OnInit {

  dataComments: any;
  newComment !: Comment;
  formPlayer !: Player;
  player: any;
  loggedIn!: Player | null;


  constructor(private communicatorService: CommunicatorService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.formPlayer = new Player(); //0, "", "", "", "", new Date(), new Date()
    this.newComment = new Comment();
    this.communicatorService.getComments().subscribe(
      result => {
        this.dataComments = result;
      }
    );

    this.communicatorService.user.subscribe((result: any) => {
      this.loggedIn = result;
      console.log(this.loggedIn);
    })
  }

  async addNewComment() {


    let info = {
      comment: this.newComment.comment,
      id_player: 7,
      created_at: this.datepipe.transform(new Date, 'yyyy-MM-dd'),
      updated_at: this.datepipe.transform(new Date, 'yyyy-MM-dd')
    }

    this.communicatorService.addComment(info).subscribe(
      result => {
        this.dataComments = result;
      }
    );
  }
}
