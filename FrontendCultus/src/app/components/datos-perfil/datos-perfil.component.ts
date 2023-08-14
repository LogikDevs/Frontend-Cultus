import { Component, ViewChild, ElementRef } from '@angular/core';
import { EditUserService } from '../../services/edit-user.service';
import { GetCountriesService } from '../../services/get-countries.service';
import { UserEditedData } from './datos-perfil.model';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
	selector: 'app-datos-perfil',
	templateUrl: './datos-perfil.component.html',
	styleUrls: ['./datos-perfil.component.scss']
})
export class DatosPerfilComponent {
	UserData:any;

	selectedImage: string | undefined;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	ProfilePictureMultimedia: File;
	constructor(private EditService: EditUserService, private countries: GetCountriesService, private userService: GetUserService) { };

	
	ngOnInit() {
		this.getUser();
		this.countriesDropbox();
	}
	getUser(){
		this.userService.getUser().subscribe((res:any)=>{
			this.UserData = res;
		})
	}
	sendProfileData(ProfileEditData: any) {
		const DataToEdit: UserEditedData = {
			description: ProfileEditData.description,
			gender: ProfileEditData.gender,
			homeland: ProfileEditData.homeland,
			profile_pic: this.ProfilePictureMultimedia,
			residence_country: ProfileEditData.residenceCountry
		}
		const NonNullData: Partial<UserEditedData> = {};
		for (const key of Object.keys(DataToEdit)) {
  			if (DataToEdit[key] !== null && DataToEdit[key] !== undefined && DataToEdit[key] !== "") {
    			NonNullData[key] = DataToEdit[key];
  			}
		}
		console.log(NonNullData);
		this.EditService.getEditUser(this.UserData, NonNullData);
	}
	triggerFileInput() {
		this.fileInput.nativeElement.click();
	}

	onFileSelected(event: any) {
		this.ProfilePictureMultimedia = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e: any) => {
			this.selectedImage = e.target.result;
		};
		reader.readAsDataURL(this.ProfilePictureMultimedia);
	}

	countriesDropbox() {
		const selecthomeland: any = document.getElementById("homeland");
		const selectresidence: any = document.getElementById("residenceCountry");
		
		this.countries.getCountries().subscribe((res: any) => {
			this.countriesIntoDropbox(selecthomeland, res);
			this.countriesIntoDropbox(selectresidence, res);
		})
	}

	countriesIntoDropbox(select: any, res: any) {
		for (let i = 0; i < res.length; i++) {
			var country = res[i];
			let newOption = new Option(country.country_name, country.id_country);

			select.add(newOption, undefined);
		}
	}

}
