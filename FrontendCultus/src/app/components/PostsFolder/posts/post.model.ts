export interface Post {
	id_post: number;
	fk_id_user: number;
	text: string;
	location: string;
	comments: number;
	votes: number;
	date: string;
}
export interface Comment {
	id_comment: number;
	fk_id_user: number;
	text: string;
}