export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  totalAnswers: number;
  createdAt: string;
  updatedAt: string;
  code: string;
  tags: string[];
  user: IUser;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePicUrl: string;
  crerkUserId: string;
}
