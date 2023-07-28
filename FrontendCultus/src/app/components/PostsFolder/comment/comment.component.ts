import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../posts/post.model';
import { GetCommentsService } from 'src/app/services/get-comments.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
    @Input() author: any;
	@Input() comment: Comment;
  constructor(private api: GetUserService) { }
  ngOnInit(){
    this.getWriter();
  }
  getWriter() {
		this.api.getUserFromId(this.comment.fk_id_user).subscribe((res: any) => {
			this.author = res.name + " " + res.surname;
		});
	}
}
