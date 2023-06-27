export class PostClass {
    postId: number;
    postIdUser: string;
    postTitle: string;
    postText: string;
    postImage: string;
    postVideo: string;
    postLocation: string;
    postVotes: number;
    postComments: number;
    
    public constructor(postId: number, postIdUser: string, postTitle: string, postText: string, postMedia: string, postVotes: number, postComments: number, postImage: string, postVideo: string, postLocation: string) {
        this.postId = postId;
        this.postIdUser = postIdUser;
        this.postTitle = postTitle;
        this.postText = postText;
        this.postImage = postImage;
        this.postVideo = postVideo;
        this.postLocation = postLocation;
        this.postVotes = postVotes;
        this.postComments = postComments;
      }
}
