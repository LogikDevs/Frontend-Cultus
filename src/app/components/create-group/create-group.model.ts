export interface NewGroupData{
    name: string,
    multimedia_file: File,
    description: string,
    cover: File,
    Type: "private" | "public"
}