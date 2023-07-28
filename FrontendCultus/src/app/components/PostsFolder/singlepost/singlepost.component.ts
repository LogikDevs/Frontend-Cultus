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
	comments: Comment[];
	constructor(private api: GetUserService, private votes: VoteService, private api2: GetCommentsService) { }
	@Input() author: any;
	@Input() post: Post;
	userId:any = localStorage.getItem("IdUser");

	ngOnInit() {
		this.getWriter();
		this.getComments();
	}
	getWriter() {
		this.api.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;
		});
	}
	
	sendComment(){
		const CommentText:any = document.getElementById("AddComment");
		this.api2.postComment(this.userId, this.post.id_post, CommentText.value).subscribe((res:any)=>{
			console.log(res);
		});
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
