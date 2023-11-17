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
import { SingleeventComponent } from './components/EventsFolder/singleevent/singleevent.component';
import { EventsComponent } from './components/EventsFolder/events/events.component';
import { EventComponent } from './components/EventsFolder/event/event.component';
import { ParticipantsComponent } from './components/EventsFolder/participants/participants.component';
import { EventInterestsComponent } from './components/EventsFolder/event-interests/event-interests.component';
import { GroupComponent } from './components/GroupsFolder/group/group.component';
import { ChatComponent } from './components/ChatsFolder/chat/chat.component';
import { MessageComponent } from './components/ChatsFolder/message/message.component';
import { JoinedgroupComponent } from './components/GroupsFolder/joinedgroup/joinedgroup.component';
import { MygroupsComponent } from './components/GroupsFolder/mygroups/mygroups.component';
import { SuggestedgroupsComponent } from './components/GroupsFolder/suggestedgroups/suggestedgroups.component';
import { JoinedeventComponent } from './components/EventsFolder/joinedevent/joinedevent.component';
import { MyeventsComponent } from './components/EventsFolder/myevents/myevents.component';
import { SuggestedeventsComponent } from './components/EventsFolder/suggestedevents/suggestedevents.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PrivateconversationsComponent } from './components/privateMsgFolder/privateconversations/privateconversations.component';
import { UserschatComponent } from './components/privateMsgFolder/userschat/userschat.component';
import { LoadedComponent } from './components/loaded/loaded.component';
import { GroupPostsComponent } from './components/GroupsFolder/group-posts/group-posts.component';
import { GrouplistComponent } from './components/GroupsFolder/GroupListFolder/grouplist/grouplist.component';
import { GroupListContainerComponent } from './components/GroupsFolder/GroupListFolder/group-list-container/group-list-container.component';
import { EventListContainerComponent } from './components/EventsFolder/EventListFolder/event-list-container/event-list-container.component';
import { EventlistComponent } from './components/EventsFolder/EventListFolder/eventlist/eventlist.component';








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
    SinglegroupComponent,
    SingleeventComponent,
    EventsComponent,
    EventComponent,
    ParticipantsComponent,
    EventInterestsComponent,
    GroupComponent,
    ChatComponent,
    MessageComponent,
    JoinedgroupComponent,
    MygroupsComponent,
    SuggestedgroupsComponent,
    JoinedeventComponent,
    MyeventsComponent,
    SuggestedeventsComponent,
    SettingsComponent,
    PrivateconversationsComponent,
    UserschatComponent,
    LoadedComponent,
    GroupPostsComponent,
    GrouplistComponent,
    GroupListContainerComponent,
    EventListContainerComponent,
    EventlistComponent
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


