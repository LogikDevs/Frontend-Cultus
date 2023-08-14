import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetPostsService } from 'src/app/services/get-posts.service';

@Component({
  selector: 'app-modal-option-post',
  templateUrl: './modal-option-post.component.html',
  styleUrls: ['./modal-option-post.component.scss']
})
export class ModalOptionPostComponent {
  @Input() ownPost:boolean;
  @Input() postId:any;
  @Output() PostRemoved = new EventEmitter<boolean>();
  @Input() optionVisibility:boolean;

  constructor(private postService: GetPostsService){}
    removePost(){
        this.postService.deletePost(this.postId).subscribe((res:any)=>{
            this.PostRemoved.emit(true);
            this.optionVisibility = false;
        })
    }
    reportPost(){
        console.log("Reported.");
        this.optionVisibility = false;
    }
    hideComponent(){
        this.optionVisibility = false;
    }
}
