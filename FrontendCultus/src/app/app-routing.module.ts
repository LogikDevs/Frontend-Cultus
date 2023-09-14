import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostsComponent } from './components/PostsFolder/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardAuthentication } from './guards/authentication-guard.guard';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';
import { SelectInterestComponent } from './components/InterestsFolder/select-interest/select-interest.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


const routes: Routes = [ 
  { path: '', component: HomeComponent, canActivate: [GuardAuthentication]},
  { path: 'home', component: HomeComponent, canActivate: [GuardAuthentication] },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent, canActivate: [GuardAuthentication] },
  { path: 'footer', component: FooterComponent, canActivate: [GuardAuthentication] },
  { path: 'register', component: RegisterComponent },
  { path: 'comienzo', component: ComienzoComponent },
  { path: 'sidebar', component: SidebarComponent, canActivate: [GuardAuthentication] },
  { path: 'posts', component: PostsComponent, canActivate: [GuardAuthentication] },
  { path: 'profile/:id', component: ProfileComponent,  canActivate: [GuardAuthentication] } ,
  { path: 'SelectUserData', component: DatosPerfilComponent, canActivate: [GuardAuthentication] },
  { path: 'createpost', component: CreatePostComponent, canActivate: [GuardAuthentication] } ,
  { path: 'SelectInterest', component: SelectInterestComponent, canActivate: [GuardAuthentication] } ,
  { path: 'ForgotPassword', component: ForgotPasswordComponent } ,

 
  { path: 'Menu-Mobile', component: MenuMobileComponent, canActivate: [GuardAuthentication] },
  { path: 'createEvent', component: CreateEventComponent, canActivate: [GuardAuthentication] },
  { path: 'crear-menu', component: CrearMenuComponent, canActivate: [GuardAuthentication] },
  { path: 'Groups', component: GruposComponent, canActivate: [GuardAuthentication] },
  { path: 'EditProfile', component: EditProfileComponent, canActivate: [GuardAuthentication] }
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }