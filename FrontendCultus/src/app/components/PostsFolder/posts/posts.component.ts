import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetPostsService } from '../../../services/get-posts.service';
import { Post } from './post.model';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {    
    posts: Post[];

    constructor(private api: GetPostsService) { }

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.api.getPosts().subscribe((res: any) => {
            this.posts = res;
        })
    }
}
