export interface NewPostData{
    text: string;
    location: number;
    multimedia_file: File;
    fk_id_event: number | null
}