import UserType from '../types/user_type';

export const userQuery = {
  type: UserType,
  resolve(parentValue, args, req) {
    return req.user;
  }
};
