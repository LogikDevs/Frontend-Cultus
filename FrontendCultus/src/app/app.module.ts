import { NgModule } from '@angular/core';


import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './components/PostsFolder/posts/posts.component';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SelectInterestComponent } from './components/select-interest/select-interest.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';
import { SidebarBackofficeComponent } from './components/sidebar-backoffice/sidebar-backoffice.component';
import { BackofficePostComponent } from './components/backoffice-post/backoffice-post.component';
import { BackofficeUsersComponent } from './components/backoffice-users/backoffice-users.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { SinglepostComponent } from './components/PostsFolder/singlepost/singlepost.component';
import { CommentComponent } from './components/PostsFolder/comment/comment.component';
import { AgenProfileComponent } from './agen-profile/agen-profile.component';
import { ModalOptionCommentComponent } from './components/modal-option-comment/modal-option-comment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    PostsComponent,
    ComienzoComponent,

    SidebarComponent,
    ProfileComponent,
    DatosPerfilComponent,
    CreatePostComponent,
    SelectInterestComponent,
    ForgotPasswordComponent,
    BackofficeComponent,
    SidebarBackofficeComponent,
    BackofficePostComponent,
    BackofficeUsersComponent,
    MenuMobileComponent,
    SinglepostComponent,
    CommentComponent,
    AgenProfileComponent,
    ModalOptionCommentComponent

   
  

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


