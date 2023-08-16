import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../components/PostsFolder/posts/post.model';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class GetPostsService {
	private urlGetPosts = 'http://localhost:8001/api/post/listAll';
	private urlGetPostsFromInterests = 'http://localhost:8001/api/post/interested/';
	private urlUserPosts = 'http://localhost:8001/api/post/listUser/';
	private urlUpdateComments='http://localhost:8001/api/post/listPost/'
	private urlGetPostsInterests='http://localhost:8001/api/characterizes/listPost/'
	private urlDeletePost='http://localhost:8001/api/post/delete/'
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
	deletePost(postId:any){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.post(this.urlDeletePost+postId, httpOptions);
	}
}
