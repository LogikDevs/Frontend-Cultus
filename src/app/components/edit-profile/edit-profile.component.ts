import { Component, ElementRef, ViewChild } from '@angular/core';
import { EditUserService } from 'src/app/services/edit-user.service';
import { GetCountriesService } from 'src/app/services/get-countries.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
	PublicUrl:string = "http://localhost:8000/storage/profile_pic/";
	
	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	selectedImage: string | undefined;
	
	userData:any;
	ProfilePictureMultimedia: File;

	profile_pic_url: any;
	description: string;
	gender: string;
	homeland: number;
	residence: number;

  	constructor(private EditService: EditUserService, 
		private countries: GetCountriesService, 
		private userService: GetUserService, 
	) {}
	ngOnInit(){
		this.countriesDropbox();
		this.getUserData();
	}
	getUserData(){
		this.userService.getUser().subscribe((res:any)=>{
			this.userData = res;
			this.bringUserData();
		})
	}
	bringUserData(){
		this.profile_pic_url = this.PublicUrl + this.userData.profile_pic;
		this.checkProfilePic();
		this.description = this.userData.description || '';
		this.gender = this.userData.gender || 'No seleccionado';
		this.homeland = this.userData.homeland || "No seleccionado";
		this.residence = this.userData.residence || "No seleccionado";
		
	}
	checkProfilePic(){
		const ProfilePicSrc:any = document.getElementById("UserPfp");
		if (this.userData.profile_pic) ProfilePicSrc.setAttribute("src", this.profile_pic_url);
	}
  	saveProfileData(DataReceived:any){
		const DataToEdit = {
			name: this.userData.name,
			surname: this.userData.surname,
			email: this.userData.email,
			age: this.userData.age,
			description: DataReceived.description,
			gender: DataReceived.gender,
			homeland: DataReceived.homeland,
			profile_pic: this.ProfilePictureMultimedia,
			residence_country: DataReceived.residence
		}

		this.EditService.ProfileEditUser(DataToEdit).subscribe((res:any)=>{});
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
		const selecthomeland: any = document.getElementById("UserHomeland");
		const selectresidence: any = document.getElementById("UserResidence");
		
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
