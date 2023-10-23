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
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SelectInterestComponent } from './components/InterestsFolder/select-interest/select-interest.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SinglepostComponent } from './components/PostsFolder/singlepost/singlepost.component';
import { CommentComponent } from './components/PostsFolder/comment/comment.component';

import { ModalOptionCommentComponent } from './components/modal-option-comment/modal-option-comment.component';
import { InterestComponent } from './components/InterestsFolder/interest/interest.component';
import { ClickOutDirectiveDirective } from './directives/click-out-directive.directive';
import { DiscoverySectionComponent } from './components/discovery-section/discovery-section.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { ModalOptionPostComponent } from './components/modal-option-post/modal-option-post.component';

import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { GruposComponent } from './components/GroupsFolder/grupos/grupos.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { SliderGruposComponent } from './components/slider-grupos/slider-grupos.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TypeSearchComponent } from './components/Search/type-search/type-search.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { AlertCompleteComponent } from './components/alert-complete/alert-complete.component';
import { CreateComponent } from './components/create/create.component';
import { FollowedSectionComponent } from './components/followed-section/followed-section.component';
import { UserSearchComponent } from './components/Search/user-search/user-search.component';
import { InterestsSearchComponent } from './components/Search/interests-search/interests-search.component';
import { SinglegroupComponent } from './components/GroupsFolder/singlegroup/singlegroup.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ComienzoComponent,
    SidebarComponent,
    ProfileComponent,
    DatosPerfilComponent,
    CreatePostComponent,
    SelectInterestComponent,
    ForgotPasswordComponent,
    SinglepostComponent,
    CommentComponent,
    ModalOptionCommentComponent,
    InterestComponent,
    ClickOutDirectiveDirective,
    DiscoverySectionComponent,
    CreateEventComponent,
    CreateGroupComponent,
    ModalOptionPostComponent,
    CrearMenuComponent,
    EditProfileComponent,
    TypeSearchComponent,
    GruposComponent,
    SliderGruposComponent,
    AlertErrorComponent,
    AlertCompleteComponent,
    CreateComponent,
    FollowedSectionComponent,
    UserSearchComponent,
    InterestsSearchComponent,
    SinglegroupComponent
  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


