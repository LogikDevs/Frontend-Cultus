export interface NewEventData{
    name: string,
    multimedia_file: File,
    description: string,
    InitDate: Date,
    CloseDate: Date,
    Type: "Private" | "Public"
}