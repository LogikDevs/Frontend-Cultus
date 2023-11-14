import { Component, Input } from '@angular/core';
import { API_URLs } from 'src/app/common/globalVariables';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-singleevent',
  templateUrl: './singleevent.component.html',
  styleUrls: ['./singleevent.component.scss']
})
export class SingleeventComponent {
    @Input() event:any;
	@Input() alreadyJoinedEvents:any;
    
	pictureUrlDefault:string = API_URLs.EVENTS+"storage/cover_event/"
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
        if (this.event.event.cover) this.eventPicture = this.pictureUrlDefault + this.event.event.cover;
    }

	checkFollowState(click:boolean){
		this.eventService.getUserFollowedEvents().subscribe((res:any)=>{
			this.userFollows = Object.values(res);
			const userFollowedEvents = this.userFollows.find((follow:any) => Number(follow.id) === this.event.event.id);
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
        this.eventService.unfollowEvent(this.event.event.id).subscribe((res:any)=>{
            this.isFollowing = "Follow";
        })
    }
    FollowAction(){
        this.eventService.followEvent(this.event.event.id).subscribe((res:any)=>{
            this.isFollowing = "Unfollow";
        })
    }
}
