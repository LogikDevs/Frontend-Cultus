export interface Post {
	commentsPublished: Comment[];
	interests: any;
	multimedia: [0];
	post: PostData;
	user: UserOnPost;
  }
  export interface Comment {
	id_comment: number;
	text: string;
	user: UserOnComment;
  }
  export interface MultimediaLink {
	multimediaLink: string
  }

  export interface PostData {
	id_post: number;
	fk_id_user: number;
	text: string;
	latitud: string;
	longitud: string;
	date: string;
	votes: number;
	comments: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
  }   
  export interface Author {
	name: string,
	surname: string
  }
  export interface UserOnComment {
	id: number;
	name: string;
	surname: string;
  }
  export interface UserOnPost {
	name: string;
	surname: string;
	profile_pic:string;
  }