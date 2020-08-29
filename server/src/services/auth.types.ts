import { IUser } from './../models/user';

export interface AuthContext extends Request {
  user?: IUser;
  login: (user: IUser, cb: (err?: Error) => void) => void;
  logIn: (user: IUser, cb: (err?: Error) => void) => void;
  logout: () => void;
}
