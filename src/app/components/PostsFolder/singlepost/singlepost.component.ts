import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

	defaultUrl:string = "http://localhost:8001/multimedia_post/";

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

	isFollowing:any;
	followButtonSrc:string = "assets/follow.png";

  	AddComment:string = '';

	vote:any;
	userVoted:any;

  	scrollOffset: number = 0;
	containerVisible: boolean = false;
  	showComments: boolean = false;
	noCommentsTemplate: any;
	commentPublishedMessage:string = "";

	likeButton:string;
	dislikeButton:string;


	@Output() PostRemoved = new EventEmitter<boolean>();

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
		this.VotesButtonColor(this.post.user_vote, true);
		this.checkProfilePic();
		this.insertMultimedia();
		this.IsFollowable();
		this.CheckFollowOrUnfollow(false)
	}

	ngAfterViewInit(){
		this.VotesColor();
	}
	checkProfilePic(){
		if (this.post.user.profile_pic) this.userPfp = this.urlPfp + this.post.user.profile_pic;
	}
	checkAuthor(){
        if (this.post.post.fk_id_user == Number(this.userId)) this.ownPost = true;
    }
	insertMultimedia(){
		if (this.post.multimedia[0]) {
			this.defaultUrl = this.defaultUrl + this.post.multimedia[0].multimediaLink;
		}
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
				this.publishedComment();
				this.showCommentLocally(CreatedComment.body);
			});
			this.AddComment = '';
		}
	}

	publishedComment(){
		this.commentPublishedMessage = "Published."
		setTimeout(() => {
			this.commentPublishedMessage = "";
		}, 3000);
	}
	showCommentLocally(CreatedComment:any){
		console.log(CreatedComment);
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
		this.post.comments.push(NewComment);
		this.updateComments();
	}

	ClickVote(votetype:any){
		if (votetype == 1) this.CreateVote(1);
		if (votetype == 0) this.CreateVote(0);
	}
	CreateVote(votetype:any){
		this.voteService.voteCreate(this.post.post.id_post, votetype).subscribe((res:any) => {
			this.userVoted = res.body;
			this.updateVotes()
			this.VotesButtonColor(this.userVoted, false);
		})
	}

	updateVotes() {
		this.voteService.updateVotes(this.post.post.id_post).subscribe((res: any) => {
			this.post.post.votes = res.post.votes;
			this.VotesColor();
		});
	}

	VotesColor(){
		const voteColor:any = document.getElementById('VotesNumber_'+this.post.post.id_post);

		if (this.post.post.votes < 0) voteColor.style.color = "#ff1c18";
		if (this.post.post.votes == 0) voteColor.style.color = "#dbdbdb";
		if (this.post.post.votes > 0) voteColor.style.color = "#00ff00";
	}

	VotesButtonColor(typeOfLike:number, onInit:boolean){
		if (typeOfLike == 0) {
			this.likeButton = "assets/post-images/like.svg"
			this.dislikeButton = "assets/post-images/disliked.png"
		}
		if (typeOfLike == 1) {
			this.likeButton = "assets/post-images/liked.png"
			this.dislikeButton = "assets/post-images/disgusto.svg"
		}
		if (onInit == false){
			if (typeOfLike == 2) {
				this.likeButton = "assets/post-images/like.svg"
				this.dislikeButton = "assets/post-images/disgusto.svg"
			}
		}
		if (onInit == true){
			if (typeOfLike == null) {
				this.likeButton = "assets/post-images/like.svg"
				this.dislikeButton = "assets/post-images/disgusto.svg"
			}
		}
	}

	updateComments(){
		this.postService.updatePostComments(this.post.post.id_post).subscribe((res:any)=>{
			this.post.comments = res.comments;
		});
	}
	CheckFollowOrUnfollow(click:boolean){
		this.followService.getUserFollowedAccounts().subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowsAccount = this.userFollows.find((follow:any) => Number(follow.id_followed) === this.post.post.fk_id_user);
			if (userFollowsAccount) {
				this.isFollowing = "Unfollow";
				if (click === false) this.followButtonSrc = "assets/unfollow.png";
				if (click === true) this.UnfollowAction();
			}
			if (!userFollowsAccount) {
				this.isFollowing = "Follow";
				if (click === false) this.followButtonSrc = "assets/follow.png";
				if (click === true) this.FollowAction();
			}
		})
	}
	FollowAction(){
		this.followService.sendFollow(this.post.post.fk_id_user).subscribe((res:any)=>{
			this.isFollowing = "Unfollow";
			this.followButtonSrc = "assets/unfollow.png";
		})
	}
	UnfollowAction(){
		this.followService.Unfollow(this.post.post.fk_id_user).subscribe((res:any)=>{
			this.isFollowing = "Follow";
			this.followButtonSrc = "assets/follow.png";
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
	
    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }	
	onRemoving(){
		this.postVisibility=false;
	}
} 