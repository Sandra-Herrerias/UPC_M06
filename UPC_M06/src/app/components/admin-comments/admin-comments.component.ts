import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { Player } from 'src/app/model/player';
import { CommunicatorService } from 'src/app/service/communicator.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.css']
})
export class AdminCommentsComponent implements OnInit {
  dataComments: any;
  newComment !: Comment;
  loggedIn!: Player;
  commentSelected !: Comment;
  showFormModify: Boolean = false;
  p: number = 1;
  ipp: number = 10;
  constructor(public communicatorService: CommunicatorService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.newComment = new Comment();
    this.communicatorService.user.subscribe((result: any) => {
      // this.loggedIn = result;
      console.log(result._id)
      this.loggedIn = new Player(result._id, result._nickname, "", result._email, "", result._role);

    })
    // this.loggedIn = this.communicatorService.usuariData();
    // console.log(this.loggedIn.id);
    this.loadComments();
  }

  loadComments() {
    this.communicatorService.getComments().subscribe(
      result => {
        this.dataComments = result;
      }
    );
  }

  /**
     * Function that asks for confirmation before deleting the comment
     * @param commentSelected
     */
  confirmDelete(commentSelected: any) {
    if (confirm("¿Está segura de eliminar este comentario?")) {

      let info = {
        id: commentSelected.id,
      }
      this.communicatorService.delete(info).subscribe(
        result => {
          let res = JSON.parse(JSON.stringify(result));

          if (res.affectedRows == 1) {//success message
            this.deleteComment(commentSelected);
            alert("Comentario eliminado correctamente");
          } else {//error message
            alert("El comentario no se ha podido eliminar");
          }
        }
      );
    }
  }


  /**
   * This method removes the comment from the list, asking info to the method from the service that removes comments.
   * @param commentSelected
   */
  deleteComment(commentSelected: any): void {
    for (let i = 0; i < this.dataComments.length; i++) {
      if (this.dataComments[i].id === commentSelected.id) {
        this.dataComments.splice(i, 1);
        break;
      }
    }
  }


  /**
 * This method shows a form to modify the selected comment and loads the comment info.
 * @param comment to modify.
 */
  showFormModifyComment(comment: any): void {
    console.log(comment);
    this.showFormModify = true;
    this.commentSelected = comment;

  }

  /**
  * This method sends the comment with the new information to the method that modifies the comment in the service.
  */
  sendInfoToModifyComment($e: any): void {
    this.communicatorService.modifyComment($e);
    this.showFormModify = false;
  }

  /**
   * Executes info that gets from child component
   * @param $e
   */
  getEventShow($e: Boolean) {
    this.showFormModify = $e;
  }

  /**
   * Executes info that gets from child component
   * @param $e
   */
  getCommentModified($modifiedComment: Comment) {

    var i: number;
    for (i = 0; i < this.dataComments.length; i++) {
      if ($modifiedComment.id == this.dataComments[i].id) {
        this.dataComments[i] = $modifiedComment;
      }
    }
  }

  addNewComment() {
    let info = {
      comment: this.newComment.comment,
      id_player: this.loggedIn?.id,
      created_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS'),
      updated_at: this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:SS'),
      nickname: this.loggedIn?.nickname,
      email: this.loggedIn?.email
    }
    this.communicatorService.addComment(info).subscribe(
      result => {
        let res = JSON.parse(JSON.stringify(result));

        if (res.affectedRows == 1) {//success message
          this.loadComments();
          alert("Comentario insertado correctamente");
          this.newComment = new Comment();//blank textfield
        } else {//error message
          alert("El comentario no se ha podido añadir");
        }
      }
    );
  }

}
