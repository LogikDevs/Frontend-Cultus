import { Component, ElementRef, ViewChild } from '@angular/core';
import { API_URLs } from 'src/app/common/globalVariables';
import { EditUserService } from 'src/app/services/edit-user.service';
import { GetCountriesService } from 'src/app/services/get-countries.service';
import { GetInterestsService } from 'src/app/services/get-interests.service';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
	PublicUrl:string = API_URLs.AUTH+"/storage/profile_pic/";
	
	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
	
	userData:any;
	
	selectedImage: string | undefined;
	ProfilePictureMultimedia: File;

	profile_pic_url: any;
	description: string;
	gender: string;
	homeland: number;
	residence: number;

	CompleteMessage = {
		Message: "The Changes were submited.",
		visibility: false
	}
	ErrorMessage = {
		Message: "There was an error while submitting the changes.",
		visibility: false
	}

  	constructor(private EditService: EditUserService, 
		private countries: GetCountriesService, 
		private userService: GetUserService, 
		public interestService: GetInterestsService
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
		this.gender = this.userData.gender || undefined;
		this.homeland = this.userData.homeland || undefined;
		this.residence = this.userData.residence || undefined;
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
		this.EditService.ProfileEditUser(DataToEdit).subscribe((res:any)=>{
			if (res.status === 200) this.OnCompleteAlert();
		},(error:any)=>{
			this.OnErrorAlert();
		})
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

	DisplayInterestSelector(){
		this.interestService.displaySelectInterest = true;
	}

	OnCompleteAlert(){
		this.CompleteMessage.visibility = true;
		this.ErrorMessage.visibility = false;

		setTimeout(() => {
			this.hideComponent(true);
		}, 4000);
	}
	OnErrorAlert(){
		this.ErrorMessage.visibility = true;
		this.CompleteMessage.visibility = false;

		setTimeout(() => {
			this.hideComponent(false);
		}, 4000);
	}
	hideComponent(Complete:boolean){
		if (Complete == true) this.CompleteMessage.visibility = false;
		
		if (Complete == false) this.ErrorMessage.visibility = false;
	}
}
