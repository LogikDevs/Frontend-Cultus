import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../components/PostsFolder/posts/post.model';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class GetPostsService {
	private urlGetPosts = 'http://localhost:8001/api/post/listAll';
	private urlGetPostsFromInterests = 'http://localhost:8001/api/post/listInterested/';
	private urlUserPosts = 'http://localhost:8001/api/post/listUser/';
	private urlUpdateComments='http://localhost:8001/api/post/listPost/'
	private urlGetPostsInterests='http://localhost:8001/api/characterizes/listPost/'
	constructor(private http: HttpClient) { }
	getPosts(): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlGetPosts, httpOptions);
	}
	getPostsDiscoverySection(userId:any): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlGetPostsFromInterests+userId, httpOptions);
	}
	getPostsInterests(IdPost:any) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlGetPostsInterests+IdPost, httpOptions);
	}
	getUserPosts(userId:any): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlUserPosts+userId, httpOptions);
	}
	updatePostComments(fk_id_post:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get(this.urlUpdateComments+fk_id_post, httpOptions);
	}
	FuncionDePrueba(){
		const json: Post[] = [{
			id_post: 200,
			fk_id_user: 234,
			text: "Hey people i would like you to tell me how can i improve my handwriting in a short period of time... I have a test tomorrow lol",
			latitud: "32145427",
			longitud: "64765343",
			date: "2011-08-23 12:55:00",
			votes: 126,
			commentsValue: 5,
			created_at: "2023-08-11T12:55:09.000000Z",
			updated_at: "2023-08-11T13:12:29.000000Z",
			deleted_at: null,
			interests: [" Education", " School", " HandWriting", " Write"],
			author: {
				name: "Mark",
				surname: "Lenon"
			},
			comments: [
			  {
				id_comment: 101,
				name: "Lukas",
				surname: "Fonso",
				fk_id_user: 53,
				text: "Bro wtf who cares... let your teacher guess"
			  },
			  {
				id_comment: 102,
				name: "Coco",
				surname: "Basile",
				fk_id_user: 23,
				text: "What if you just shut"
			  },
			  {
				id_comment: 103,
				name: "Mina",
				surname: "Florentina",
				fk_id_user: 234,
				text: "Just grab a bunch of paper and write. That worked for me."
			  },
			  {
				id_comment: 104,
				name: "Luis",
				surname: "Coto",
				fk_id_user: 98,
				text: "You are 19 how the fuck you still have bad handwriting lmao"
			  },
			  {
				id_comment: 105,
				name: "Vicente",
				surname: "Isi",
				fk_id_user: 122,
				text: "Well, you teacher is gonna have a great time correcting your test."
			  }
			],
			multimedia: "File"
		}]
		return json;
	}
}
