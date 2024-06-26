import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardAuthentication } from './guards/authentication-guard.guard';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';
import { SelectInterestComponent } from './components/InterestsFolder/select-interest/select-interest.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { GruposComponent } from './components/GroupsFolder/grupos/grupos.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TypeSearchComponent } from './components/Search/type-search/type-search.component';
import { AlertErrorComponent } from './components/alert-error/alert-error.component';
import { AlertCompleteComponent } from './components/alert-complete/alert-complete.component';
import { CreateComponent } from './components/create/create.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { FollowedSectionComponent } from './components/followed-section/followed-section.component';
import { EventsComponent } from './components/EventsFolder/events/events.component';
import { EventComponent } from './components/EventsFolder/event/event.component';
import { GroupComponent } from './components/GroupsFolder/group/group.component';
import { PrivateconversationsComponent } from './components/privateMsgFolder/privateconversations/privateconversations.component';
import { LoadedComponent } from './components/loaded/loaded.component';
import { GroupListContainerComponent } from './components/GroupsFolder/GroupListFolder/group-list-container/group-list-container.component';
import { EventListContainerComponent } from './components/EventsFolder/EventListFolder/event-list-container/event-list-container.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, canActivate: [GuardAuthentication]},
  { path: 'home', component: HomeComponent, canActivate: [GuardAuthentication] },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent, canActivate: [GuardAuthentication] },
  { path: 'footer', component: FooterComponent, canActivate: [GuardAuthentication] },
  { path: 'register', component: RegisterComponent },
  { path: 'comienzo', component: ComienzoComponent },
  { path: 'sidebar', component: SidebarComponent, canActivate: [GuardAuthentication] },
  { path: 'profile/:id', component: ProfileComponent,  canActivate: [GuardAuthentication] } ,
  { path: 'SelectUserData', component: DatosPerfilComponent, canActivate: [GuardAuthentication] },
  { path: 'createpost', component: CreatePostComponent, canActivate: [GuardAuthentication] } ,
  { path: 'SelectInterest', component: SelectInterestComponent, canActivate: [GuardAuthentication] } ,
  { path: 'ForgotPassword', component: ForgotPasswordComponent } ,
  { path: 'createEvent', component: CreateEventComponent, canActivate: [GuardAuthentication] },
  { path: 'EditProfile', component: EditProfileComponent, canActivate: [GuardAuthentication] },
  { path: 'Search', component: TypeSearchComponent, canActivate: [GuardAuthentication] },
  { path: 'crear-menu', component: CrearMenuComponent, canActivate: [GuardAuthentication] },
  { path: 'Groups', component: GruposComponent, canActivate: [GuardAuthentication] },
  { path: 'AlertComplete', component: AlertCompleteComponent, canActivate: [GuardAuthentication] },
  { path: 'AlertError', component: AlertErrorComponent, canActivate: [GuardAuthentication] },
  { path: 'Create', component: CreateComponent, canActivate: [GuardAuthentication] },
  { path: 'createGroup', component: CreateGroupComponent, canActivate: [GuardAuthentication] },
  { path: 'FollowedSection', component: FollowedSectionComponent, canActivate: [GuardAuthentication] },
  { path: 'events', component: EventsComponent, canActivate: [GuardAuthentication] },
  { path: 'event/:id', component: EventListContainerComponent, canActivate: [GuardAuthentication] },
  { path: 'group/:id', component: GroupListContainerComponent, canActivate: [GuardAuthentication] },
  { path: 'Messages', component: PrivateconversationsComponent, canActivate: [GuardAuthentication] },
  { path: 'Messages/:id', component: PrivateconversationsComponent, canActivate: [GuardAuthentication] },
  { path: 'Loaded', component: LoadedComponent, canActivate: [GuardAuthentication] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }