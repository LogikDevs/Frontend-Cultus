export class UserClass {
    userId: number;
    userName: string;
    userSurname: string;
    userAge: number;
    userGender: string;
    userHomeland: string;
    userResidence: string;
    userDescription: string;
    userPicture: string;
    
    public constructor(userId: number, userName: string, userSurname: string, userAge: number, userGender: string, userHomeland: string, userResidence: string, userDescription: string, userPicture: string) {
        this.userId = userId;
        this.userName = userName;
        this.userSurname = userSurname;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userHomeland = userHomeland;
        this.userResidence = userResidence;
        this.userDescription = userDescription;
        this.userPicture = userPicture;
      }
}