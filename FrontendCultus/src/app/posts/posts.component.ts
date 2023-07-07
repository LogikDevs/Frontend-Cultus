import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GetPostsService } from '../services/get-posts.service';
import { GetUserService } from '../services/get-user.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

    constructor(private api: GetPostsService, private api2: GetUserService) {}

    ngOnInit(){
        this.api.getPosts().subscribe((res:any) => {
            for(let i = res.length-1; i >= 0; i--){
                this.api2.getUserFromId(res[i].fk_id_user).subscribe((resUser:any)=>{
                    let userData = resUser;
                    this.postGeneration(res[i], userData);
                })
            }
        })
    }
    postGeneration(postDataFromRes:any, userData:any){
        var HtmlPost = `<div class="ContainerPost">
                <div class="ContainerPostMobile">
                    <div class="HeaderPost">
                        <div class="UserPost">
                            <div class="UserLogo">
                                <img src="/assets/post-images/profile_def.jpg" alt="">
                            </div>
                            <div class="NameAndDate">
                                 <div class="UsernamePost">
                                    <p>${userData.name + " " + userData.surname}</p>
                                </div>
                            <div class="PostUploadDate">
                                <p>${postDataFromRes.date.substring(2, postDataFromRes.date.length-3)}</p>
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
                        <p>${postDataFromRes.text}</p>
                    </div>
                
                    
                    <div class="FooterPost">
                        <div class="DataPost">
                            <div class="UpvotesPost">
                            <div class="IconUpvotesPost">
                            <img src="assets/post-images/like.svg" alt=""> 
                                           </div>
                                <div class="AmountUpvotesPost">
                                </div>
                                <p>${postDataFromRes.votes}</p>
                                <div class="IconUpvotesPost">
                                <img src="assets/post-images/disgusto.svg" alt=""> 
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
                                <p>${postDataFromRes.location}</p>
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
                            <img src="/assets/post-images/profile_def.jpg" alt="">
                        </div>
                        <div class="UsernameProfile">
                            <p>${userData.name + " " + userData.surname}</p>
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
        const post = document.createElement("div");
        post.innerHTML = HtmlPost;
        var appPost:any = document.querySelector('.Post');
        appPost.appendChild(post);
    }
}
