import { IUser } from './../models/user';


export interface AuthContext extends Request {
  user?: IUser,
  login: (user: IUser, cb: Function) => void,
  logIn: (user: IUser, cb: Function) => void,
  logout: () => void
}
