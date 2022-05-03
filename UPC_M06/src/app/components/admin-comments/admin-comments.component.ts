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
  loggedIn!: Player | null;
  commentSelected !: Comment;
  showFormModify: Boolean = false;

  constructor(public communicatorService: CommunicatorService) { }

  ngOnInit(): void {

    this.newComment = new Comment();
    this.communicatorService.getComments().subscribe(
      result => {
        this.dataComments = result;
      }
    );
    this.communicatorService.user.subscribe((result: any) => {
      this.loggedIn = result[0];
    })
  }


  
  /**
     * Function that asks for confirmation before deleting the comment
     * @param commentSelected 
     */
   confirmDelete(commentSelected: any) {
    if (confirm("Are you sure to delete this comment?")) {

      let info = {
        id: commentSelected.id,
      }
      this.communicatorService.delete(info).subscribe(
        result => {
          console.log("respuesta");
          console.log(result);
          //TODO if result OK
          this.deleteComment(commentSelected);
          //SINO missatge error
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

}
