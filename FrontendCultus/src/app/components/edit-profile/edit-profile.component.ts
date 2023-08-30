import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditUserService } from 'src/app/services/edit-user.service';
import { GetCountriesService } from 'src/app/services/get-countries.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { UserEditedData } from '../datos-perfil/datos-perfil.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  selectedImage: string | undefined;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	ProfilePictureMultimedia: File;
  	constructor(private EditService: EditUserService, private countries: GetCountriesService, private userService: GetUserService, private router: Router) { };

  	saveProfileData(DataReceived:any){
		const DataToEdit: UserEditedData = {
			description: DataReceived.description,
			gender: DataReceived.gender,
			homeland: DataReceived.homeland,
			profile_pic: this.ProfilePictureMultimedia,
			residence_country: DataReceived.residenceCountry
		}
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
