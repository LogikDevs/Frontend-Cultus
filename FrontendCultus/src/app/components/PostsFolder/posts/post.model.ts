export interface Post {
	id_post: number;
	fk_id_user: number;
	text: string;
	latitud: string;
	longitud: string;
	date: string;
	votes: number;
	commentsValue: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	interests: string[];
	author: Author,
	comments: Comment[];
	multimedia: string;
  }
  export interface Comment {
	id_comment: number;
	name: string,
	surname: string,
	fk_id_user: number;
	text: string;
  }
  export interface Author {
	name: string,
	surname: string
  }