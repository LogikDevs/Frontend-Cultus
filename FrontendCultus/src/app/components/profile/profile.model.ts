export interface User {
    id: number,
	email: string,
	name: string,
	surname: string,
    age: number,
	gender: string,
	homeland: number|string,
	residence: number|string,
	description: string,
	profile_pic: string
}
export interface UserCountries {
    homelandName: string,
	residenceName: string
}