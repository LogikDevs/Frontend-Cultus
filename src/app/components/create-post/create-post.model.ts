export interface NewPostData{
    text: string;
    latitud: string;
    longitud: string;
    multimedia_file: File;
    fk_id_event: number | null
}