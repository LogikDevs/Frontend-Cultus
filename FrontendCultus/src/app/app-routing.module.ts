import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ComienzoComponent } from './comienzo/comienzo.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { GuardAuthentication } from './guards/authentication-guard.guard';
import { CreatePostComponent } from './create-post/create-post.component';
import { DatosPerfilComponent } from './datos-perfil/datos-perfil.component';
import { SelectInterestComponent } from './select-interest/select-interest.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

import { SidebarBackofficeComponent } from './sidebar-backoffice/sidebar-backoffice.component';
import { BackofficePostComponent } from './backoffice-post/backoffice-post.component';
import { BackofficeUsersComponent } from './backoffice-users/backoffice-users.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, canActivate: [GuardAuthentication]},
  { path: 'home', component: HomeComponent, canActivate: [GuardAuthentication]},
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'comienzo', component: ComienzoComponent },
  { path: 'sidebar', component: SidebarComponent , canActivate: [GuardAuthentication]},
  { path: 'posts', component: PostsComponent , canActivate: [GuardAuthentication]},
  { path: 'profile', component: ProfileComponent , canActivate: [GuardAuthentication]} ,
  { path: 'optionsdata', component: DatosPerfilComponent , canActivate: [GuardAuthentication]},
  { path: 'createpost', component: CreatePostComponent , canActivate: [GuardAuthentication]} ,
  { path: 'SelectInterest', component: SelectInterestComponent , canActivate: [GuardAuthentication]} ,
  { path: 'ForgotPassword', component: ForgotPasswordComponent } ,
  { path: 'backoffice', component: BackofficeComponent } ,
  { path: 'backoffice-post', component: BackofficePostComponent },
  { path: 'backoffice-users', component: BackofficeUsersComponent},
  { path: 'sidebar-backoffice', component: SidebarBackofficeComponent },
  { path: 'Menu-Mobile', component: MenuMobileComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }