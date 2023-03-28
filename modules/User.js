import * as bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function Register(req, res) {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password)
      throw "Please fill all the fields";

    const emailExists = await User.findOne({ email });
    if (emailExists) throw "Email already registered";

    const usernameExists = await User.findOne({ username });
    if (usernameExists) throw "Username already registered";

    const unixTime = Math.floor(new Date().getTime() / 1000);

    const newUser = new User({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      createdAt: unixTime,
    });

    const savedUser = await newUser.save();
    const token = savedUser.getSignedJwtToken();

    res.status(201).json({
      status: 201,
      token,
      user: "Has been successfully registered",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: 200,
      data: error,
    });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw "Please fill all the fields";

    const user = await User.findOne({ email });
    if (!user) throw "Incorrect credentials";

    if (!bcrypt.compareSync(password, user.password))
      throw "Incorrect credentials";

    // console.log(res);

    const token = await user.getSignedJwtToken();

    // delete user.role;
    res.status(200).json({
      user,
      token,
      msg: "You have started session correctly",
    });
  } catch (error) {
    console.log(error);
    //cambiar status de respuesta
    res.status(404).json({
      status: 404,
      data: error,
    });
  }
}

export async function CheckStatus(req, res) {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    const user = await User.findById(decoded.id, "-password");
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const newToken = await user.getSignedJwtToken();

    res.status(200).json({
      status: 200,
      data: {
        user,
        token: newToken,
      },
    });
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export async function GetUsers(req, res) {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 200,
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      error,
    });
  }
}
