import { Component, Input } from '@angular/core';
import { Post, Comment } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { GetCommentsService } from 'src/app/services/get-comments.service';

@Component({
	selector: 'app-singlepost',
	templateUrl: './singlepost.component.html',
	styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent {
	@Input() author: any;
	@Input() post: Post;
	userId:any = localStorage.getItem("IdUser");
	username:any;
	comments: Comment[];
	AddComment:string = '';
	
	
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
			this.AddComment = ''; // Limpiar el formulario
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
}
