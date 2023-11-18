import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../components/PostsFolder/singlepost/post.model';
import { Observable } from 'rxjs';
import { API_URLs } from '../common/globalVariables';
@Injectable({
	providedIn: 'root'
})
export class GetPostsService {
	private urlGetPosts = API_URLs.POSTS+'/api/v1/posts/';
	private urlGetPostsFromInterests = API_URLs.POSTS+'/api/v1/posts/interested/';
	private urlUserPosts = API_URLs.POSTS+'/api/v1/posts/user/';
	private urlUpdateComments=API_URLs.POSTS+'/api/v1/posts/list/'
	private urlGetPostsInterests=API_URLs.POSTS+'/api/v1/characterizes/listPost/'
	private urlGetPostsFromFolloweds=API_URLs.POSTS+'/api/v1/posts/followed';
	private urlDeletePost=API_URLs.POSTS+'/api/v1/posts/delete/'
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
	getPostsDiscoverySection(): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlGetPostsFromInterests, httpOptions);
	}
	getPostsFollowedsSection(): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlGetPostsFromFolloweds, httpOptions);
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
	getUserPosts(ProfileId:any): Observable<Post[]> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ` + localStorage.getItem("accessToken")
			})
		}
		return this.http.get<Post[]>(this.urlUserPosts+ProfileId, httpOptions);
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
		return this.http.delete(this.urlDeletePost+postId, httpOptions);
	}
}
