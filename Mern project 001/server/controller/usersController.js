import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't extst " });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { email: user.email, password: user.password, id: user._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { fName, lName, email, password, ConfirmPassword } = req.body;

  // checking Old values -------------------------------------------

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User Already Exist! Try LogIn" });
  }
  if (password !== ConfirmPassword) {
    return res.status(400).json({ message: "Password don't match" });
  }

  // creating New User ------------------------------------------
  const hashedPassword = await bcrypt.hash(password, 12);
  await new userModel({
    name: `${fName} ${lName}`,
    email: email,
    password: hashedPassword,
  })
    .save()
    .then((result) => {
      const token = jwt.sign(
        {
          email: result.email,
          password: result.password,
          id: result._id,
        },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({ result, token });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
