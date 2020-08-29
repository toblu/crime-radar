import bcrypt from 'bcrypt-nodejs';
import mongoose, { Document } from 'mongoose';

export type IUser = {
  id: string;
  email: string;
  password: string;
};

type ComparePasswordFn = (
  candidatePassword: string,
  cb: (err, isMatch) => void
) => void;

export type UserDocument = Document &
  IUser & {
    comparePassword: ComparePasswordFn;
  };

const Schema = mongoose.Schema;

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema<UserDocument>({
  email: String,
  password: String
});

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre<UserDocument>('save', function save(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(
  this: UserDocument,
  candidatePassword: string,
  cb: (err: Error, isMatch: boolean) => void
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

export default mongoose.model<UserDocument>('user', UserSchema);
