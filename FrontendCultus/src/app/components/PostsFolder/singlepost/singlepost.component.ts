import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { FollowsService } from 'src/app/services/follows.service';

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
	@Input() post: Post;
	@Input() defaultUrl:string = "http://localhost:8001/";

    postVisibility:boolean = true;
    postId:any;
	ownPost:boolean = false;
    displayedOptions:boolean = false;

	Followable:boolean = false;
	userFollows:any[] = [];
	userFollowsAccount:any;

  	userId:any = localStorage.getItem("IdUser");
	
  	AddComment:string = '';

	vote:any;

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;

	constructor(private voteService: VoteService, private commentsService: GetCommentsService, private postService: GetPostsService, private followService: FollowsService) { }
	ngOnInit() {
		this.insertMultimedia();
		this.IsFollowable();
		this.CheckFollowOrUnfollow(false)
    	this.postId = this.post.post.id_post;
	}
	insertMultimedia(){
		if (this.post.multimedia[0]) this.defaultUrl = this.defaultUrl + this.post.multimedia[0];
	}
	VotesColor(){
		const voteColor:any = document.getElementById('VotesNumber_'+this.post.post.id_post);
		if (this.post.post.votes < 0) voteColor.style.color = "#DB4141";
		if (this.post.post.votes == 0) voteColor.style.color = "grey";
		if (this.post.post.votes > 0) voteColor.style.color = "#537D57";
	}
	IsFollowable(){
		if (this.post.post.fk_id_user != this.userId) this.Followable = true;
	}
	sendComment(){
		const bodyComment = {
			fk_id_user: this.userId,
			fk_id_post: this.post.post.id_post,
			text: this.AddComment
		}
		if (this.AddComment.trim() !== '') {
			this.commentsService.postComment(bodyComment).subscribe((CreatedComment:any)=>{
				this.showCommentLocally(CreatedComment);
			});
			this.AddComment = '';
		}
	}	
	showCommentLocally(CreatedComment:any){
		const NewComment: Comment = {
			id_comment: CreatedComment.comment.id_comment,
			user:{
				id:	CreatedComment.comment.fk_id_user,
				name: CreatedComment.user.name,
				surname: CreatedComment.user.surname
			}, 
			text: CreatedComment.comment.text
		}
		this.post.commentsPublished.push(NewComment);
		this.updateComments();
	}


	ClickVote(votetype:any){
		this.voteService.checkUserVotes(this.userId).subscribe((res:any)=>{
			this.vote = res.find((vote:any) => vote.fk_id_post === this.post.post.id_post);
			this.CheckVote(votetype);
		})
	}
	CheckVote(votetype:any) {
		if (this.vote && this.vote.vote == votetype) this.DeleteVote(this.vote.id_vote);

		if (!this.vote || this.vote.vote != votetype) this.CreateVote(votetype);
	}

	CreateVote(votetype:any){
		this.voteService.voteCreate(this.post.post.id_post, this.userId, votetype).subscribe((res) => {this.updateVotes()})
	}
	DeleteVote(voteId:any){
		this.voteService.voteDelete(voteId).subscribe((res)=>{this.updateVotes()})
	}

	updateVotes() {
		this.voteService.updateVotes(this.post.post.id_post).subscribe((res: any) => {
			this.post.post.votes = res.votes;
			this.VotesColor();
		});
	}

	updateComments(){
		this.postService.updatePostComments(this.post.post.id_post).subscribe((res:any)=>{
			this.post.post.comments = res.comments;
		});
	}

	CheckFollowOrUnfollow(click:boolean){
		this.followService.getUserFollowedAccounts(this.userId).subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowsAccount = this.userFollows.find((follow:any) => Number(follow.id_followed) === Number(this.post.post.fk_id_user));
			if (userFollowsAccount) {
				//CAMBIAR IMAGEN A DEJAR DE SEGUIR
				if (click === true) this.UnfollowAction();
			}
			if (!userFollowsAccount) {
				//CAMBIAR IMAGEN A SEGUIR
				if (click === true) this.FollowAction();
			}			
		})
	}
	FollowAction(){
		this.followService.sendFollow(this.userId, this.post.post.fk_id_user).subscribe((res:any)=>{
			if (res.id_followed[0] === "This user already follows the other.") this.UnfollowAction();
			//CAMBIAR IMAGEN A DEJAR DE SEGUIR
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.userId, this.post.post.fk_id_user).subscribe((res:any)=>{
			//CAMBIAR IMAGEN A SEGUIR
		})
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
	
	checkAuthor(){
        if (this.post.post.fk_id_user == Number(this.userId)) this.ownPost = true;
    }
    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }	
	onRemoving(){
		this.postVisibility=false;
	}
} 