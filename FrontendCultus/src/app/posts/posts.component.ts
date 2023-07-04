import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PostClass } from 'src/app/posts/PostClass';
import { GetPostsService } from '../services/get-posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  HtmlPost = `<div class="ContainerPost">
<div class="ContainerPostMobile">
    <div class="HeaderPost">
        <div class="UserPost">
            <div class="UserLogo">
                <img src="assets/pelado.png" alt="">
            </div>
            <div class="NameAndDate">
                 <div class="UsernamePost">
                <p>Steve Kollins</p>
            </div>
            <div class="PostUploadDate">
                <p>Hace 2 horas</p>
            </div>
            </div>
           
       
        <div class="OptionsPost">
            <img src="assets/menu-logo.png" alt="">
        </div>
 </div>
    </div>
    <div class="Interest">
        <p>#Uruguay</p>
        <p>#Pde</p>
    </div>
    <div class="PostDescription">
        <p>Que hermosas que son las playas de uruguay</p>
    </div>

    <div class="PostImage">
        <img src="assets/punta del este.png" alt="">
    </div>
    <div class="FooterPost">
        <div class="DataPost">
            <div class="UpvotesPost">
                <div class="IconUpvotesPost">
 <img src="assets/like-green.png" alt=""> 
                </div>
                <div class="AmountUpvotesPost">
                    <p>100k</p>
                </div>
            </div>
            <div class="CommentsPost">
                <div class="IconCommentsPost">
                    <img src="assets/chat.png" alt=""> 
                </div>
                <div class="AmountCommentPost">
                    <p>20k</p>
                </div>
            </div>
        </div>
        <div class="SharePost">
            <div class="IconSharePost">
                <img src="assets/share.png" alt=""> 
            </div>
        </div>
    </div>
</div>
<div class="ContainerPostDesktop">
    <!-- <div class="PostDesktop">
        <div class="HeaderPostDesktop">
            <div class="LocationPostDesktop">
                <p>Paris,Francia</p>
            </div>
            <div class="OptionPostDesktop">
            </div>
        </div>

        <div class="PostContentImageAndInteractions">
            <div class="ImagePostDesktop">
                <img src="" alt="">
            </div>
            <div class="InteractionsPostDesktop">
                <div class="IconUpvote">
                </div>
                <div class="IconComment">
                </div>
                <div class="IconShare">
                </div>
            </div>
        </div>
        <div class="TextPostDesktop">
            <p>Estoy muy sorprendido por las vistas de esta maravillosa ciudad</p>
        </div>
        <div class="AddCommentDesktop">
            <input type="text" placeholder="Agregar comentario...">
        </div>
    </div> -->
    <div class="ProfilePostDesktop">
        <div class="PerfilImage">
            <img src="assets/pelado1.jpg" alt="">
        </div>
        <div class="UsernameProfile">
            <p>Steve Kollins</p>
        </div>
        <div class="DataProfile">
            <div class="Follow">
<img src="/assets/follow.png" alt="">
            </div>
            <div class="SendMessage">
                <img src="/assets/charlando.png" alt="">
            </div>
            <div class="Country">
                <img src="/assets/estados-unidos.png" alt="">
            </div>
            <div class="OptionsProfilePost">
                <img src="/assets/menu-logo.png" alt="">
            </div>
        </div>
    </div>
</div>    
</div>`

  constructor(private api: GetPostsService) {}
  ngOnInit(){
    this.api.getPosts().subscribe(res => {
      console.log(res);
    })
  }
}
