
export type UserProps = {
    id : string;
    name : string;
    username : string;
    gender : "MALE" | "FEMALE",
    country : string;
    dateOfBirth: string;
    profilePicture : string;
    intrestes : string[];
    bio : string;
    images? : any[];
}

