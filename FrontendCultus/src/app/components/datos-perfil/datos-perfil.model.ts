export interface UserEditedData {
    description: string  | undefined,
    gender: string  | undefined,
    homeland: number  | undefined,
    profile_pic: File  | undefined,
    residence_country: number  | undefined,
    [key: string]: string | number | File | undefined
}