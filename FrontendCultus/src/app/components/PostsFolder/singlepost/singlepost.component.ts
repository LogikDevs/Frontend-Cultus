import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
	selector: 'app-singlepost',
	templateUrl: './singlepost.component.html',
	styleUrls: ['./singlepost.component.scss'],
	animations: [
	    trigger('showHideComments', [
			    state('show', style({ height: '200px', opacity: 1 })),
			    state('hide', style({ height: '0', opacity: 0, display: 'none' })),
			    transition('show <=> hide', animate('300ms ease-in-out')),
		   ]),
	],
  })

  export class SinglepostComponent implements OnInit {
  	@Input() author: any;
	@Input() post: Post;

  	userId:any = localStorage.getItem("IdUser");
  	username:any;
  	comments: Comment[];
  	AddComment:string = '';

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;

	constructor(private userService: GetUserService, private voteService: VoteService, private commentsService: GetCommentsService, private postService: GetPostsService) { }
	ngOnInit() {
		this.PostData();
		this.getComments();	
	}

	PostData() {
		this.userService.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;
			//this.VotesColor();		
		});
	}

	sendComment(){
		const bodyComment = {
			fk_id_user: this.userId,
			fk_id_post: this.post.id_post,
			text: this.AddComment
		}

		if (this.AddComment.trim() !== '') {
			this.commentsService.postComment(bodyComment).subscribe((CreatedComment:any)=>{
				const NewComment: Comment = {
					id_comment: CreatedComment.id_comment,
					fk_id_user: CreatedComment.fk_id_user,
					text: CreatedComment.text
				}
				this.comments.push(NewComment);
				this.updateComments();
			});
			this.AddComment = '';
		}
		
	}	
	getComments() {
        this.commentsService.getComment(this.post.id_post).subscribe((res: any) => {
            this.comments = res;
        })
  	}

	ClickVote(votetype: any) {
		this.voteService.voteCreate(this.post.id_post, this.userId, votetype).subscribe((res: any) => {
			this.updateVotes();
		})
	}
	updateVotes() {
		this.voteService.updateVotes(this.post.id_post).subscribe((res: any) => {
			this.post.votes = res.votes;
			
			this.VotesColor();
		});
	}

	updateComments(){
		this.postService.updatePostComments(this.post.id_post).subscribe((res:any)=>{
			this.post.comments = res.comments;
		});
	}
	VotesColor(){
		const VotesNumber:any = document.getElementById("VotesNumber");
		if (this.post.votes < 0){
			VotesNumber.style.color = "red";
		}else{
			VotesNumber.style.color = "green"
		}
	}
	mostrarComentarios() {
		this.showComments = true;
	}
	ocultarComentarios() {
		this.showComments = false;
	}
	toggleComments() {
	  this.showComments = !this.showComments;
	}
} 