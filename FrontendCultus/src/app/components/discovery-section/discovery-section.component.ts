import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { Post } from '../PostsFolder/posts/post.model';

@Component({
    selector: 'app-discovery-section',
    templateUrl: './discovery-section.component.html',
    styleUrls: ['./discovery-section.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DiscoverySectionComponent implements OnInit {    
    DiscoveryPosts: Post[];

    constructor(private postsService: GetPostsService) { }

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.postsService.getPostsFromInterests().subscribe((res: any) => {
            this.DiscoveryPosts = res;
            console.log(this.DiscoveryPosts);
        })
    }
}