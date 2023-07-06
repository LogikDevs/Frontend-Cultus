import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './posts/posts.component';
import { ComienzoComponent } from './comienzo/comienzo.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { DatosPerfilComponent } from './datos-perfil/datos-perfil.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SelectInterestComponent } from './select-interest/select-interest.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { SidebarBackofficeComponent } from './sidebar-backoffice/sidebar-backoffice.component';
import { BackofficePostComponent } from './backoffice-post/backoffice-post.component';
import { BackofficeUsersComponent } from './backoffice-users/backoffice-users.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';

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
    MenuMobileComponent

  

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


