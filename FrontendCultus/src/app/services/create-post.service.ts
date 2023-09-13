import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CreatePostService {
	private urlCreatePost = 'http://localhost:8001/api/post/create';
	private urlCreateMultimedia = 'http://localhost:8001/api/multimedia/create';
	constructor(private http: HttpClient) { }

	postCreate(postDataReceived: any) {
		const body = {
			text: postDataReceived.text,
			latitud: postDataReceived.latitud,
			longitud:postDataReceived.longitud
		}
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlCreatePost, body, httpOptions);
	}
	postMultimedia(MultimediaReceived: File, PostIdReceived: any) {
		const formData = new FormData();
		formData.append('fk_id_post', PostIdReceived);
		formData.append('multimedia_file', MultimediaReceived);
	
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			}),
		};
		return this.http.post(this.urlCreateMultimedia, formData, httpOptions);
	}
}
