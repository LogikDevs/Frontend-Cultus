import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostRegisterService } from '../services/post-register.service';
import { EditUserService } from '../services/edit-user.service';

@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.scss']
})
export class DatosPerfilComponent {
  constructor(private api: EditUserService){};
  selectedImage: string | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  sendProfileData(ProfileEditData:any){
    this.api.getEditUser(ProfileEditData);
  }
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
