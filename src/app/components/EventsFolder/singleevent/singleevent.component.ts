import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-singleevent',
  templateUrl: './singleevent.component.html',
  styleUrls: ['./singleevent.component.scss']
})
export class SingleeventComponent {
    @Input() event:any;
	@Input() alreadyJoinedEvents:any;
    
	pictureUrlDefault:string = "http://localhost:8003/storage/cover_event/"
	eventPicture:string = "";

    userFollows:any;
    isFollowing:any;

    constructor(
        private eventService: EventService
    ){}
    ngOnInit(){
        this.checkIfCoverExists();
        this.checkFollowState(false);
    }

    checkIfCoverExists(){
        if (this.event[0].cover) this.eventPicture = this.pictureUrlDefault + this.event[0].cover;
    }

	checkFollowState(click:boolean){
		this.eventService.getUserFollowedEvents().subscribe((res:any)=>{
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
