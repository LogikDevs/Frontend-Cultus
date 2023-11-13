import { Component } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { Post } from '../PostsFolder/singlepost/post.model';

@Component({
    selector: 'app-followed-section',
    templateUrl: './followed-section.component.html',
    styleUrls: ['./followed-section.component.scss']
})
export class FollowedSectionComponent {
    userId: any;
    
    posts: Post[];

    constructor(
        private postService: GetPostsService,
        private userService: GetUserService
    ) { }

    ngOnInit() {
        this.getUser();
        this.getPosts();
    }
    getUser() {
        this.userService.getUser().subscribe((res: any) => {
            this.userId = res.id;
        })
    }
    getPosts() {
        this.postService.getPostsFollowedsSection().subscribe((res: any) => {
            this.posts = res;
        })
    }
}
