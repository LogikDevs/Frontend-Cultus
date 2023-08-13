import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
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
	@Input() defaultUrl:string = "http://localhost:8001/"
	Followable:boolean = false;
	userFollows:any[] = [];
	userFollowsAccount:any;

  	userId:any = localStorage.getItem("IdUser");
	UserData:any = this.userService.getUserData;
  	username:any;
	
  	AddComment:string = '';

	vote:any;

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;

	constructor(private userService: GetUserService, private voteService: VoteService, private commentsService: GetCommentsService, private postService: GetPostsService, private followService: FollowsService) { }
	ngOnInit() {
		this.IsFollowable();
		this.CheckFollowValue();
	}
	//ngAfterContentInit(){
	//	this.VotesColor();
	//}
	VotesColor(){
		const voteColor:any = document.getElementById('VotesNumber_'+this.post.post.id_post);
		if (this.post.post.votes < 0) voteColor.style.color = "red";
		if (this.post.post.votes == 0) voteColor.style.color = "grey";
		if (this.post.post.votes > 0) voteColor.style.color = "green";
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
				const NewComment: Comment = {
					id_comment: CreatedComment.id_comment,
					user:{
						id:	CreatedComment.fk_id_user,
						name: CreatedComment.name,
						surname: CreatedComment.surname
					}, 
					text: bodyComment.text
				}
				console.log(NewComment);
				this.post.commentsPublished.push(NewComment);
				this.updateComments();
			});
			this.AddComment = '';
		}
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
		this.voteService.voteCreate(this.post.post.id_post, this.userId, votetype).subscribe((res: any) => {
			this.updateVotes();
			
		})
	}
	DeleteVote(voteId:any){
		this.voteService.voteDelete(voteId).subscribe((res:any)=>{
			this.updateVotes();
			
		})
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
	CheckFollowValue(){
			this.followService.getUserFollowedAccounts(this.userId).subscribe((res:any)=>{
				this.userFollows = Object.values(res);
				this.userFollowsAccount = this.userFollows.find(follow => follow.id_followed === this.post.post.fk_id_user);
			})
	}
	
	CheckFollowOrUnfollow(){
			if (this.userFollowsAccount) this.UnfollowAction();
			if (!this.userFollowsAccount) this.FollowAction();
	}
	FollowAction(){
		this.followService.sendFollow(this.userId, this.post.post.fk_id_user).subscribe((res:any)=>{
			this.CheckFollowValue();
			console.log("Followed");
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.userId, this.post.post.fk_id_user).subscribe((res:any)=>{
			this.CheckFollowValue();
			console.log("Unfollowed");
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
} 