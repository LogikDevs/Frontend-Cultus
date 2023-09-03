import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetPostsService } from '../../../services/get-posts.service';
import { Post } from './post.model';
import { GetUserService } from 'src/app/services/get-user.service';
import { FollowsService } from 'src/app/services/follows.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {    
    posts: Post[];
    userId = localStorage.getItem("IdUser");
    
    constructor(private postService: GetPostsService, private followService: FollowsService) { }

    ngOnInit() {
    }
}
