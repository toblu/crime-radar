import UserType from '../types/user_type';

export const logoutMutation = {
    type: UserType,
    resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
    }
};
