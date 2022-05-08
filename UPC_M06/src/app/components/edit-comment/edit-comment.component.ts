import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Comment } from '../../model/comment';
import { CommunicatorService } from '../../service/communicator.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  /**
   * Connection between components. 
   * comments Table is her mother component.
   * input is used to indicate that this variable (comment) comes from abroad
   * (from comments Table in this case). 
   */
  @Input() comment!: Comment;

  @Output() modifiedComment = new EventEmitter<Comment>();

  @Output() eventShow = new EventEmitter<Boolean>();

  newComment: Comment = new Comment();

  constructor(public communicatorService: CommunicatorService) { }

  ngOnInit(): void {

  }

  /**
  * This method sets the new values to modify the object.
  */
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.comment.id);
    this.newComment = new Comment(this.comment.id, this.comment.comment, this.comment.id_player, this.comment.created_at, this.comment.updated_at, this.comment.nickname, this.comment.email);

  }

  /**
* This method saves the new info to modify the comments and sends it to the method that actually modifies the comments in the service.
* Also shows the form to collect the new info.
*/
  emitInfoModifyComments(): void {
    this.modifiedComment.emit(this.newComment);

    let info = {
      "id": this.newComment.id,
      "comment": this.newComment.comment
      // id_player: this.newComment.id_player,
      // created_at: this.newComment.created_at,
      // updated_at: new Date(),
      // nickname: this.newComment.nickname,
      // email: this.newComment.email,
    }
    // console.log(info);
    if (this.newComment.comment) {
      this.communicatorService.modifyComment(info).subscribe(
        (result: any) => {
          // let res = JSON.parse(JSON.stringify(result));
          console.log(result);
          if (result.success) { //success message
            alert("Comentario modificado correctamente");
          } else {//error message
            alert("El comentario no se ha podido modificar");
          }
        }
      );
    }else {//error message
      alert("El comentario no puede estar vacío");
    }


    //Emits father that modify form will be hidden
    this.eventShow.emit(false);
  }
}
