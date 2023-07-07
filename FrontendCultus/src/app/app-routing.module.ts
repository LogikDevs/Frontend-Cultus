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
import { PostsComponent } from './components/posts/posts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardAuthentication } from './guards/authentication-guard.guard';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { DatosPerfilComponent } from './components/datos-perfil/datos-perfil.component';
import { SelectInterestComponent } from './components/select-interest/select-interest.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BackofficeComponent } from './components/backoffice/backoffice.component';

import { SidebarBackofficeComponent } from './components/sidebar-backoffice/sidebar-backoffice.component';
import { BackofficePostComponent } from './components/backoffice-post/backoffice-post.component';
import { BackofficeUsersComponent } from './components/backoffice-users/backoffice-users.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';

const routes: Routes = [ 
  { path: '', component: HomeComponent, canActivate: [GuardAuthentication]},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'comienzo', component: ComienzoComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'profile', component: ProfileComponent } ,
  { path: 'optionsdata', component: DatosPerfilComponent },
  { path: 'createpost', component: CreatePostComponent } ,
  { path: 'SelectInterest', component: SelectInterestComponent } ,
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