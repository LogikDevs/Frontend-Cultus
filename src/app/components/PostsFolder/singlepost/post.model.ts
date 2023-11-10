export interface Post {
	comments: Comment[];
	interests: any;
	multimedia: MultimediaLink;
	post: PostData;
	user: UserOnPost;
  }
  export interface Comment {
	id_comment: number;
	text: string;
	user: UserOnComment;
  }
  export interface MultimediaLink {
	0: {
		multimediaLink: string
	}
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
	profile_pic: string;
  }
  export interface UserOnPost {
	name: string;
	surname: string;
	profile_pic: string;
  }