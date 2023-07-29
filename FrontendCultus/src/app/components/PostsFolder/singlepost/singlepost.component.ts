import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';

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
 
	constructor(private api: GetUserService, private votes: VoteService, private api2: GetCommentsService) { }
	ngOnInit() {
		this.PostData();
		this.getComments();
	
	}

	PostData() {
		this.api.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;		
		});
	}
	getSelfUser(){
		this.api.getUserFromId(this.userId).subscribe((res: any)=>{
			this.username = res.name + " " + res.surname;
		})
	}
	
	sendComment(){
		if (this.AddComment.trim() !== '') {
			this.api2.postComment(this.userId, this.post.id_post, this.AddComment).subscribe((res:any)=>{
				const NewComment: Comment = {
					id_comment: res.id_comment,
					fk_id_user: res.fk_id_user,
					text: res.text
				}
				this.comments.push(NewComment);
			});
			this.AddComment = '';
		  }
		
	}	
	getComments() {
        this.api2.getComment(this.post.id_post).subscribe((res: any) => {
            this.comments = res;
        })
  }
	ClickVote(votetype: any) {
		this.votes.voteCreate(this.post.id_post, this.userId, votetype).subscribe((res: any) => {
			this.updateVotes();
		})
	}
	updateVotes() {
		this.votes.updateVotes(this.post.id_post).subscribe((res: any) => {
			this.post.votes = res.votes;
		});
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