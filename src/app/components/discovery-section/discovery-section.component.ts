import { Component } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';
import { Post } from '../PostsFolder/singlepost/post.model';
import { GetUserService } from 'src/app/services/get-user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-discovery-section',
  templateUrl: './discovery-section.component.html',
  styleUrls: ['./discovery-section.component.scss']
})
export class DiscoverySectionComponent {
  	userId:any;
  	posts: Post[];
	events:any = [];
  
  	constructor(
		private postService: GetPostsService, 
		private userService: GetUserService,
		private eventService: EventService
	) { }

  	ngOnInit() {
		this.getUser();
		this.getEvents();
      	this.getPosts();
  	}
  	getUser(){
    	this.userService.getUser().subscribe((res:any)=>{
      		this.userId = res.id;
    	})
  	}
	getEvents(){
		this.eventService.getEventsFromInterests().subscribe((res:any)=>{
			this.events = res;
			console.log(this.events);
		})
	}
  	getPosts() {
      	this.postService.getPostsDiscoverySection().subscribe((res: any) => {
          	this.posts = res;
      	})
  	}
}
