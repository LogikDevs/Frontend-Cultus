import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostRegisterService } from '../services/post-register.service';
import { EditUserService } from '../services/edit-user.service';
import { GetCountriesService } from '../services/get-countries.service';

@Component({
  selector: 'app-datos-perfil',
  templateUrl: './datos-perfil.component.html',
  styleUrls: ['./datos-perfil.component.scss']
})
export class DatosPerfilComponent {
  constructor(private api: EditUserService, private countries: GetCountriesService){};
  
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
  countriesDropbox(){
    const selecthomeland:any = document.getElementById("homeland");
    const selectresidence:any = document.getElementById("residenceCountry");
    this.countries.getCountries().subscribe((res:any)=>{
      this.countriesIntoDropbox(selecthomeland, res);
      this.countriesIntoDropbox(selectresidence, res);
    })
  }
  countriesIntoDropbox(select:any,res:any){
    for (let i = 0; i < res.length; i++){
      var country = res[i];
      let newOption = new Option(country.country_name, country.id_country);
      select.add(newOption,undefined);
    }
  }
  ngOnInit(){
    this.countriesDropbox();
  }
}
