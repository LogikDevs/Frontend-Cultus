export interface Post {
	id_post: number;
	fk_id_user: number;
	text: string;
	location: string;
	votes: number;
	date: string;
}