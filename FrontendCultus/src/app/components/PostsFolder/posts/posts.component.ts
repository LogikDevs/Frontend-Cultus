import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GetPostsService } from '../../../services/get-posts.service';
import { Post } from './post.model';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
    posts: Post[];
    constructor(private api: GetPostsService, private api2: GetUserService) { }

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.api.getPosts().subscribe((res: any) => {
            this.posts = res;
        })
    }
}
