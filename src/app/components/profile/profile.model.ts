export interface User {
    id: number,
	email: string,
	name: string,
	surname: string,
    age: number,
	gender: string,
	homeland: Country,
	residence: Country,
	description: string,
	profile_pic: string
}
export interface Country {
country_name: any
}