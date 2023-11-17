import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLs } from '../common/globalVariables';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {
  	private URLCreateComment = API_URLs.POSTS+"api/v1/comments/create";
  	private URLGetComment = API_URLs.POSTS+"api/v1/comments/listPost/";
	private URLDeleteComment = API_URLs.POSTS+"api/v1/comments/delete/";
  	constructor(private http: HttpClient) { }
  
 	 getComment(PostId:number): Observable<Comment[]>{
    	const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
    	return this.http.get<Comment[]>(this.URLGetComment + PostId, httpOptions);
  	}

  	postComment(receivedPostData:any) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			}),
			observe: "response" as 'body'
		}
		return this.http.post(this.URLCreateComment, receivedPostData, httpOptions);
  	}
  	deleteComment(CommentId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.delete(this.URLDeleteComment+CommentId, httpOptions);
  	}
}
