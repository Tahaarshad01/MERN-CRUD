import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import "./db/conn.js";
import Register, { IAdmin } from "./model/regis.js";
import { z } from "zod";
import {signUpInput} from "@tahaarshad/common"
const jwtkey = "jwtkey";
const app = express();

// to recieve the body data //
app.use(express.json());
const port = 5000;
app.use(cors());

//connection// file
app.use(express.json());

///conneting model///

//insert api///

app.post("/register", async (req, res) => {
  const { name, email, password, conPassword, mobile, address } = req.body;
  const parsedInput = signUpInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      msg: parsedInput.error,
    });
    return;
  }
  const emailInput = parsedInput.data.email;
  const passwordInput = parsedInput.data.password;

  const saltRound = 10;
  const hashPass = await bcrypt.hashSync(password, saltRound);
  const hashConPass = await bcrypt.hashSync(conPassword, saltRound);
  const registerData: IAdmin = await new Register({
    name,
    email,
    password: hashPass,
    conPassword: hashConPass,
    mobile,
    address,
  } as IAdmin);
  const registerEmail = await Register.findOne({ email });
  if (registerEmail) {
    res.send({ message: "Already register with this mail id" });
  } else {
    const result = registerData.save();
    res.send({ message: "register Sucessfully", user: result });
  }
});

app.get("/fetch", async (req, res) => {
  let result = await Register.find();
  res.send(result);
});

////delete api ///
app.delete("/delete/:id", async (req, res) => {
  let result = await Register.deleteOne({ _id: req.params.id });
  res.send(result);
});

//get particular user details//
app.get("/getDetails/:id", async (req, res) => {
  let result = await Register.findById({ _id: req.params.id });
  res.send(result);
});

///to Update data ////

app.put("/update/:id", async (req, res) => {
  let result = await Register.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//login api //
const signInInput = z.object({
  email: z.string().min(1).max(20),
  password: z.string().min(1).max(15),
});
app.post("/login", async (req, res) => {
  const parsedInput = signInInput.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      msg: parsedInput.error,
    });
    return;
  }
  const emailInput = parsedInput.data.email;
  const passwordInput = parsedInput.data.password;
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await Register.findOne({ email: email });
      console.log(user);
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          //////generate token////////
          const token = jwt.sign({ user }, jwtkey);
          res.send({ message: "login sucess", user, token });
        } else {
          res.send({ message: "Email and password is not valid" });
        }
      } else {
        res.send({ message: "you are not a registerd user" });
      }
    } else {
      res.send({ message: "All fields are required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "Unable to Login" });
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  console.log(`http:localhost:${port}`);
});
