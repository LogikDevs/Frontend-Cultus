import { Component } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { Post } from '../PostsFolder/posts/post.model';

@Component({
  selector: 'app-discovery-section',
  templateUrl: './discovery-section.component.html',
  styleUrls: ['./discovery-section.component.scss']
})
export class DiscoverySectionComponent {

  userId:any = localStorage.getItem("IdUser");
  posts: Post[];
  
  constructor(private postService: GetPostsService) { }

  ngOnInit() {
      this.getPosts();
  }

  getPosts() {
      this.postService.getPostsDiscoverySection(this.userId).subscribe((res: any) => {
          this.posts = res;
          console.log(this.posts);
      })
  }
}
