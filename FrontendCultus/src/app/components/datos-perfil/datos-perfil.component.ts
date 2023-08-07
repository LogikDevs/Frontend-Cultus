import { Component, ViewChild, ElementRef } from '@angular/core';
import { EditUserService } from '../../services/edit-user.service';
import { GetCountriesService } from '../../services/get-countries.service';

@Component({
	selector: 'app-datos-perfil',
	templateUrl: './datos-perfil.component.html',
	styleUrls: ['./datos-perfil.component.scss']
})
export class DatosPerfilComponent {
	selectedImage: string | undefined;

	@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

	constructor(private api: EditUserService, private countries: GetCountriesService) { };
	
	ngOnInit() {
		this.countriesDropbox();
	}
	
	sendProfileData(ProfileEditData: any) {
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
