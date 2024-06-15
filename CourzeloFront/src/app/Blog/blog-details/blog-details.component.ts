import { Component, OnInit } from '@angular/core';
import { Blog } from '../BlogClass/blog';
import { BlogService } from '../BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Interactions } from '../InteractionsClass/interactions';
import * as uuid from 'uuid';
import { concatMap, map } from 'rxjs';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | undefined;
  comments: Interactions[] = [];
  //blogId: string = ''; // Assurez-vous d'avoir l'ID du blog
  interaction: Interactions = {
    id: '',
    commentaire: '',
    replay: [],
  };
  submitted = false;
  replies: Interactions[] = [];
  currentCommentId: string | null = null;
  replyText: string = '';
  showReplyInput: { [key: string]: boolean } = {};
  currentCommentReplies: Interactions[] = [];
  badWordsList = ['badword1', 'badword2', 'badword3'];
  constructor(private blogService: BlogService, private route: ActivatedRoute) { }
  



ngOnInit(): void {
  this.getBlogById();
  this.getCommentaires();
  // this.getRepliesForComment(this.currentCommentId!);


}

getBlogPhotoUrl(photoName: any): string {
  // Assuming getPhotoUrl is a method in your BlogService
  return this.blogService.getPhoto(photoName);
}

getBlogById(): void {
  const blogId = this.route.snapshot.paramMap.get('id');
  if(blogId) {
    this.blogService.getBlog(blogId).subscribe(
      (blog) => {
        this.blog = blog;
        this.getCommentaires();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
getCommentaires(): void {
  const blogId = this.route.snapshot.paramMap.get('id');

  if(blogId) {
    this.blogService.getComment(blogId).subscribe(
      (comments) => {
        this.comments = Array.isArray(comments) ? comments : [];

        console.log(this.comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

addInteraction(): void {
  const blogId = this.route.snapshot.paramMap.get('id');
  const confirm = window.confirm('Warning: The comment contains inappropriate language.')||window.close;
  if (blogId) {
    // Check for bad words in the comment before proceeding
    if (this.containsBadWords(this.interaction.commentaire)&&confirm) {
      return;
      
    }

    this.interaction.id = uuid.v4();
    this.blogService.addComment(blogId, this.interaction).subscribe(
      (response) => {
        console.log('Interaction ajoutée avec succès', response);
        this.interaction.commentaire = '';
        this.getCommentaires();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'interaction', error);
      }
    );
  }
}

// New method to check for bad words in a comment
containsBadWords(comment: string): boolean {
  const lowerCaseComment = comment.toLowerCase();
  return this.badWordsList.some(badWord => lowerCaseComment.includes(badWord));
}

toggleReplyInput(commentId: string): void {
  this.showReplyInput[commentId] = !this.showReplyInput[commentId];
  this.currentCommentId = this.showReplyInput[commentId] ? commentId : null;
}

getRepliesForComment(commentId: string): void {
  if(commentId) {
    this.blogService.getReplies(commentId).subscribe(
      (replies) => {
        this.currentCommentReplies = Array.isArray(replies) ? replies : [];
        console.log("hedhy" + this.currentCommentReplies);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
// addReply(): void {
//   const commentId = this.currentCommentId;
//   if (commentId) {
//     const reply: Interactions = {
//       id: uuid.v4(),
//       commentaire: this.replyText, // Set the text from the replyText property
//     };

//     this.blogService.addReply(commentId, reply).subscribe(
//       (response) => {
//         console.log('Réponse ajoutée avec succès', response);
//         this.replyText = ''; // Clear the replyText
//         this.getCommentaires();
//         this.getRepliesForComment(commentId); // Update the list of replies for the parent comment
//       },
//       (error) => {
//         console.error('Erreur lors de l\'ajout de la réponse', error);
//       }
//     );
//   }
// }
addReply(commentId: string): void {
  if(commentId) {
    const reply: Interactions = {
      id: uuid.v4(),
      commentaire: this.replyText,
      replay: [],  // Ensure that each reply has its own array for potential nested replies
    };

    // Assuming your server-side logic correctly associates the reply with the selected comment
    this.blogService.addReply(commentId, reply).subscribe(
      (response) => {
        console.log('Réponse ajoutée avec succès', response);
        this.replyText = '';
        this.getCommentaires();
        this.getRepliesForComment(commentId);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réponse', error);
      }
    );
  }
}
}

