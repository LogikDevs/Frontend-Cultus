import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-singleevent',
  templateUrl: './singleevent.component.html',
  styleUrls: ['./singleevent.component.scss']
})
export class SingleeventComponent {
    @Input() event:any;

    Image:any = ""
    userFollows:any;
    isFollowing:any;

    constructor(
        private eventService: EventService
    ){}
    ngOnInit(){
        this.checkFollowState(false);
    }
	checkFollowState(click:boolean){
		this.event.getUserFollowedEvents().subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowedEvents = this.userFollows.find((follow:any) => Number(follow.id) === this.event.id);
			if (userFollowedEvents) {
				this.isFollowing = "Unfollow";
				if (click === true) this.UnfollowAction();
			}
			if (!userFollowedEvents) {
				this.isFollowing = "Follow";
				if (click === true) this.FollowAction();
			}
		})
	}
    UnfollowAction(){
        this.eventService.unfollowEvent().subscribe((res:any)=>{
            this.isFollowing = "Follow";
        })
    }
    FollowAction(){
        this.eventService.followEvent().subscribe((res:any)=>{
            this.isFollowing = "Unfollow";
        })
    }
}
