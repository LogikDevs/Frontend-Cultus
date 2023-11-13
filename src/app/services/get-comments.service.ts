import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {
  	private URLCreateComment = "http://localhost:8001/api/v1/comments/create";
  	private URLGetComment = "http://localhost:8001/api/v1/comments/listPost/";
	private URLDeleteComment = "http://localhost:8001/api/v1/comments/delete/";
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
