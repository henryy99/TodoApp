import mongoose from "mongoose";
export interface IUser extends Document {
  _id: string; // MongoDB _id
  name: string;
  email: string;
  photo?: string;
}
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
