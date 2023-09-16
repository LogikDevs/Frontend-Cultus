import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Post, Comment } from './post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { FollowsService } from 'src/app/services/follows.service';
import { Router } from '@angular/router';

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

	defaultUrl:string = "http://localhost:8001/storage/multimedia_post/";

	urlPfp:any="http://localhost:8000/storage/profile_pic/";
	userPfp:any="/assets/post-images/profile_def.jpg";
	
	@Input() ProfilePosts:boolean = false;
	@Input() userId:any;
	
	displayedOptions:boolean = false;
    postVisibility:boolean = true;
    postId:any;
	ownPost:boolean = false;

	Followable:boolean = false;
	userFollows:any[] = [];
	userFollowsAccount:any;

  	AddComment:string = '';

	vote:any;

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;

	constructor(
		private voteService: VoteService, 
		private commentsService: GetCommentsService, 
		private postService: GetPostsService, 
		private followService: FollowsService, 
		private router: Router
	) { }
	ngOnInit() {
		this.postId = this.post.post.id_post;

		this.checkAuthor();
		this.checkProfilePic();
		this.insertMultimedia();
		this.IsFollowable();
		this.CheckFollowOrUnfollow(false)
	}
	checkProfilePic(){
		if (this.post.user.profile_pic) this.userPfp = this.urlPfp + this.post.user.profile_pic;
	}
	checkAuthor(){
        if (this.post.post.fk_id_user == Number(this.userId)) this.ownPost = true;
    }
	insertMultimedia(){
		if (this.post.multimedia[0]) this.defaultUrl = this.defaultUrl + this.post.multimedia[0];
	}
	IsFollowable(){
		if (this.post.post.fk_id_user != this.userId) this.Followable = true;
	}
	clickedProfile(){
		this.router.navigateByUrl('/profile/'+this.post.post.fk_id_user);
	}
	sendComment(){
		const bodyComment = {
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
				surname: CreatedComment.user.surname,
				profile_pic: CreatedComment.user.profile_pic
			}, 
			text: CreatedComment.comment.text
		}
		this.post.commentsPublished.push(NewComment);
		this.updateComments();
	}

	ClickVote(votetype:any){
		if (votetype == 1) this.CreateVote(1);
		if (votetype == 0) this.CreateVote(0);
	}
	CreateVote(votetype:any){
		this.voteService.voteCreate(this.post.post.id_post, votetype).subscribe((res) => {this.updateVotes()})
	}

	updateVotes() {
		this.voteService.updateVotes(this.post.post.id_post).subscribe((res: any) => {
			this.post.post.votes = res[0].post.votes;
			this.VotesColor();
		});
	}
	VotesColor(){
		const voteColor:any = document.getElementById('VotesNumber_'+this.post.post.id_post);
		if (this.post.post.votes < 0) voteColor.style.color = "#DB4141";
		if (this.post.post.votes == 0) voteColor.style.color = "grey";
		if (this.post.post.votes > 0) voteColor.style.color = "#537D57";
	}

	updateComments(){
		this.postService.updatePostComments(this.post.post.id_post).subscribe((res:any)=>{
			this.post.post.comments = res.comments;
		});
	}
	CheckFollowOrUnfollow(click:boolean){
		this.followService.getUserFollowedAccounts().subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowsAccount = this.userFollows.find((follow:any) => Number(follow.id_followed) === Number(this.post.post.fk_id_user));
			if (userFollowsAccount) {
				if (click === true) this.UnfollowAction();
			}
			if (!userFollowsAccount) {
				if (click === true) this.FollowAction();
			}			
		})
	}
	FollowAction(){
		this.followService.sendFollow(this.post.post.fk_id_user).subscribe((res:any)=>{
			if (res.id_followed[0] === "This user already follows the other.") this.UnfollowAction();
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.post.post.fk_id_user).subscribe((res:any)=>{})
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
	
    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }	
	onRemoving(){
		this.postVisibility=false;
	}
} 