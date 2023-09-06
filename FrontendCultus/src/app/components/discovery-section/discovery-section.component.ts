import { Component, Input } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { Post } from '../PostsFolder/posts/post.model';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-discovery-section',
  templateUrl: './discovery-section.component.html',
  styleUrls: ['./discovery-section.component.scss']
})
export class DiscoverySectionComponent {

  	userId:any;
  	posts: Post[];
  
  	constructor(private postService: GetPostsService, private userService: GetUserService) { }

  	ngOnInit() {
      	this.getPosts();
  	}
  	getUser(){
    	this.userService.getUser().subscribe((res:any)=>{
      		this.userId = res.id;
    	})
  	}
  	getPosts() {
      	this.postService.getPostsDiscoverySection(this.userId).subscribe((res: any) => {
          	this.posts = res;
          	console.log(this.posts);
      	})
  	}
}
