import { IProfile } from "./profile.model";

export interface IComment {
  id: number;
  body: string;
  createdAt: string;
  author: IProfile;
}

