const express = require("express");
const app = express();
var jwt = require("jsonwebtoken");
var jwtkey = "jwtkey";
const bcrypt = require("bcrypt");
// to recieve the body data //
app.use(express.json());
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

//connection// file
app.use(express.json());
require("./db/conn.js");

///conneting model///
const Register = require("./model/regis.js");

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://amazing-gelato-4767de.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("https://fanciful-profiterole-6b0d4c.netlify.app");
  next();
});

//insert api///
app.post("/register", async (req, res) => {
  const { name, email, password, conPassword, mobile, address } = req.body;
  const saltRound = 10;
  const hashPass = bcrypt.hashSync(password, saltRound);
  const hashConPass = bcrypt.hashSync(conPassword, saltRound);
  const registerData = await Register({
    name,
    email,
    password: hashPass,
    conPassword: hashConPass,
    mobile,
    address,
  });
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
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await Register.findOne({ email: email });
      console.log(user);
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          //////generate token////////
          const token = jwt.sign({ user }, jwtkey, { expiresIn: "1h" });
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

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  console.log(`http:localhost:${PORT}`);
});
