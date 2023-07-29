import { Component, Input } from '@angular/core';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
	selector: 'app-singlepost',
	templateUrl: './singlepost.component.html',
	styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent {

	@Input() author: any;
	@Input() post: Post;
	comments: Comment[];
	userId:any = localStorage.getItem("IdUser");

	username:any;
	Text: any;
	CommentText:any;
	constructor(private api: GetUserService, private votes: VoteService, private api2: GetCommentsService, private postservice: GetPostsService) { }
	
	ngOnInit() {
		this.PostData();
		this.ChangeElementNames();
		this.getComments();
	}

	PostData() {
		this.api.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;		
		});
	}
	ChangeElementNames(){
		this.postservice.getPosts().subscribe((res: any) => {
			const button = document.getElementById("CommentButton");
			const CommentName = document.getElementById("AddComment");
			console.log(CommentName);
			button?.setAttribute("id", `${this.post.id_post}`);
			CommentName?.setAttribute("id", "AddComment"+this.post.id_post);		
		});
	}
	getSelfUser(){
		this.api.getUserFromId(this.userId).subscribe((res: any)=>{
			this.username = res.name + " " + res.surname;
		})
	}
	
	sendComment(event:any){
		const buttonId = event.target.id;
		this.Text = document.getElementById("AddComment"+buttonId);
		this.api2.postComment(this.userId, this.post.id_post, this.Text.value).subscribe((res:any)=>{
			this.getComments();
		});
	}	
	getComments() {
        this.api2.getComment(this.post.id_post).subscribe((res: any) => {
            this.comments = res;
			console.log(this.comments);
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
}
