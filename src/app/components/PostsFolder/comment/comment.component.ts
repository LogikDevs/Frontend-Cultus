import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../singlepost/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
    @Input() comment: Comment;
    @Input() author: any;
    @Input() userId:any;
    
    displayedOptions:boolean = false;
    commentVisibility:boolean = true;
    commentId:any;
    ownComment:boolean = false;
    
    urlPfp:any="http://localhost:8000/storage/profile_pic/";
    userPfp:any="/assets/post-images/profile_def.jpg";

    constructor(
        private router: Router
    ) { }

    ngOnInit(){
        this.commentId = this.comment.id_comment;
        this.checkAuthor();
        this.checkProfilePic();
    }
    checkProfilePic(){
        if (this.comment.user) this.userPfp = this.urlPfp + this.comment.user.profile_pic;
    }
    checkAuthor(){
        const idToNum = Number(this.userId);
        if (this.comment.user.id == idToNum) this.ownComment = true;
    }
	clickedProfile(){
		this.router.navigateByUrl('/profile/'+this.comment.user.id);
	}
    
    displayOptions(event: Event){
        event.stopPropagation(); 
        this.displayedOptions = !this.displayedOptions;
    }

    onRemoving() {
        this.commentVisibility=false;
    }
}
