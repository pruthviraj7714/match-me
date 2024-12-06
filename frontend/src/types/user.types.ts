
export interface LikeProps {
    id: string;
    likerId: string;
    likedToId: string;
    createdAt: Date;
  }
  
  export interface UserProps {
    id: string;
    name: string;
    username: string;
    password: string;
    profilePicture: string;
    createdAt: Date;
    updatedAt: Date;
    bio: string;
    dateOfBirth: string;
    country: string;
    interests: string[];
    gender: "MALE" | "FEMALE";
    likesGiven: LikeProps[];
    likesReceived: LikeProps[];
  }