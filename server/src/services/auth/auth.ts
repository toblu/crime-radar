import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AuthContext } from './auth.types';
import { UserModel } from '@crime-alert/shared';
import { IUser } from '@crime-alert/shared/dist/models/user';

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser<IUser, string>((user, done) => {
    done(null, user.id);
});

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user);
    });
});

// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Invalid Credentials' });
            }
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    done(err);
                    return;
                }
                if (isMatch) {
                    done(null, user);
                    return;
                }
                done(null, false, { message: 'Invalid credentials.' });
            });
        });
    })
);

// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
function signup({
    email,
    password,
    req
}: {
    email: string;
    password: string;
    req: AuthContext;
}): Promise<IUser> {
    const user = new UserModel({ email, password });
    if (!email || !password) {
        throw new Error('You must provide an email and password.');
    }

    return UserModel.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                throw new Error(
                    'Email is already in use, please provide another email'
                );
            }
            return user.save();
        })
        .then((user) => {
            return new Promise((resolve, reject) => {
                req.logIn(user, (err: Error) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(user);
                });
            });
        });
}

// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login({
    email,
    password,
    req
}: {
    email: string;
    password: string;
    req: AuthContext;
}): Promise<IUser> {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user) => {
            if (!user) {
                reject(new Error('Invalid credentials.'));
            }

            req.login(user, () => resolve(user));
        })({ body: { email, password } });
    });
}

export default { signup, login };
