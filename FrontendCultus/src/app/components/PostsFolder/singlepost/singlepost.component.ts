import { Component, Input } from '@angular/core';
import { Post } from '../posts/post.model';
import { VoteService } from 'src/app/services/vote.service';
import { GetUserService } from 'src/app/services/get-user.service';
@Component({
	selector: 'app-singlepost',
	templateUrl: './singlepost.component.html',
	styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent {
	constructor(private api: GetUserService, private votes: VoteService) { }
	@Input() author: any;
	@Input() post: Post;
	user: any;
	ngOnInit() {	
		this.getUser();
		this.getWriter();
	}
	getWriter() {
		this.api.getUserFromId(this.post.fk_id_user).subscribe((res: any) => {
			this.author = res;
		});
	}
	getUser() {
		this.api.getUser().subscribe((res: any) => {
			this.user = res;
		});
	}
	ClickVote(votetype: any) {
		this.votes.voteCreate(this.post.id_post, this.user.id, votetype).subscribe((res: any) => {
			this.updateVotes();
		})
	}
	updateVotes() {
		this.votes.updateVotes(this.post.id_post).subscribe((res: any) => {
			this.post.votes = res.votes;
		});
	}
}
