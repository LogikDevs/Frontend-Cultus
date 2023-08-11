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
  	@Input() author: any;
	@Input() post: Post;
	@Input() postInterests:any;

	Followable:boolean = false;
	userFollows:any[] = [];
	userFollowsAccount:any;

  	userId:any = localStorage.getItem("IdUser");
  	username:any;
  	comments: Comment[];
	
  	AddComment:string = '';

	userVotes:any[] = [];;
	vote:any;

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;

	constructor(private userService: GetUserService, private voteService: VoteService, private commentsService: GetCommentsService, private postService: GetPostsService, private followService: FollowsService) { }
	ngOnInit() {
		this.PostData();
		this.IsFollowable();
		this.CheckFollowValue()
		this.getPostsInterests();
		this.getComments();
	}
	//ngAfterContentInit(){
	//	this.VotesColor();
	//}
	VotesColor(){
		const voteColor:any = document.getElementById('VotesNumber_'+this.post.id_post);
		if (this.post.votes < 0) voteColor.style.color = "red";
		if (this.post.votes == 0) voteColor.style.color = "grey";
		if (this.post.votes > 0) voteColor.style.color = "green";
	}
	PostData() {
		this.userService.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;
		});
	}
	IsFollowable(){
		if (this.post.fk_id_user != this.userId) this.Followable = true;
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
	getPostsInterests(){
		this.postService.getPostsInterests(this.post.id_post).subscribe((res: any) => {
            this.postInterests = res;
        })
	}

	ClickVote(votetype:any){
		this.voteService.checkUserVotes(this.userId).subscribe((res:any)=>{
			this.userVotes = res;	
			this.vote = this.userVotes.find(vote => vote.fk_id_post === this.post.id_post);
			this.CheckVote(votetype);
		})
	}	
	CheckVote(votetype:any) {
		if (this.vote && this.vote.vote == votetype) this.DeleteVote(this.vote.id_vote);
		
		if (!this.vote || this.vote.vote != votetype) this.CreateVote(votetype);
	}

	CreateVote(votetype:any){
		this.voteService.voteCreate(this.post.id_post, this.userId, votetype).subscribe((res: any) => {
			this.updateVotes();
		})
	}
	DeleteVote(voteId:any){
		this.voteService.voteDelete(voteId).subscribe((res:any)=>{
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

	CheckFollowValue(){
		this.followService.getUserFollowedAccounts(this.userId).subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			this.userFollowsAccount = this.userFollows.find(follow => follow.id_followed === this.post.fk_id_user);
			if (this.userFollowsAccount) console.log("USER " + this.userId + " FOLLOWS USER " + this.post.fk_id_user);
		})
	}
	CheckFollowOrUnfollow(){
		this.followService.getUserFollowedAccounts(this.userId).subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			this.userFollowsAccount = this.userFollows.find(follow => follow.id_followed === this.post.fk_id_user);
			
			if (this.userFollowsAccount) this.UnfollowAction();
			if (!this.userFollowsAccount) this.FollowAction();
		})
	}
	FollowAction(){
		this.followService.sendFollow(this.userId, this.post.fk_id_user).subscribe((res:any)=>{
			console.log("followed");
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.userId, this.post.fk_id_user).subscribe((res:any)=>{
			console.log("unfollowed");
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