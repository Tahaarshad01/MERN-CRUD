// import mongoose from 'mongoose';
// const mongoose = require('mongoose')
// const { Schema } = mongoose;
// import { Schema } from "mongoose";
// import mongoose, { Schema, Document } from "mongoose";
import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  mobile: number;
  address: string;
  password: string;
  conPassword: string;
  date: Date;
}

const registerSchema: Schema<IAdmin> = new Schema<IAdmin>({
  name: String, // String is shorthand for {type: String}
  email: String,
  mobile: Number,
  address: String,
  password: String,
  conPassword: String,
  date: { type: Date, default: Date.now },
});

///creating  model///
const Register = mongoose.model<IAdmin>("register", registerSchema);
// module.exports = Register;
export default Register;
