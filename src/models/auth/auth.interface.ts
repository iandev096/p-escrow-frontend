import { Provider } from './auth.enum';
import { IContactDetail } from '../contactDetail/contactDetail.interface';

export interface IBaseUser {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
  email: string;
  fullName: string;
  contactNumber: string | null;
  profilePicture: string | null;
}

export interface IUser extends IBaseUser {
  emailVerified?: boolean;
  contactNumberVerified?: boolean;
  contactDetail: IContactDetail;
}

export interface IAuth {
  user?: IUser;
  jwt: string;
}

interface IVerification {
  verification?: { emailVerified: boolean, contactNumberVerified: boolean}
}

export interface IAuthState extends IVerification {
  isLoggedIn: boolean;
  fullName: string | null;
  userId: string | null;
  email: string;
}

export interface IJwtPayload extends IVerification {
  fullName?: string;
  userId?: string;
  email?: string;
  provider?: Provider,
  exp: number,
  iat: number,
  verification?: { emailVerified: boolean, contactNumberVerified: boolean}
}
