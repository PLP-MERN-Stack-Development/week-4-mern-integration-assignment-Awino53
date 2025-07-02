import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    // Your signup logic here
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
        error: true,
      });
    }
    // Assuming you have a User model to handle user creation
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }
    const newUser = await new User({ name, email, password })

    // Hash the password before saving
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log("Error during signup:", error);
    // Handle the error appropriately
    res
      .status(401)
      .json({
        message: "Error occurred during signup",
        success: false,
        error: true,
      });
  }
};


// login and logout functions
export const login = async (req, res) => {
  try {
    // Your login logic here
    res.status(200).json({
      message: "Login function called",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "Error occurred during login",
      success: false,
      error: true,
    });
  }
};
export const logout = async (req, res) => {
  try {
    // Your logout logic here
    res.send("Logout function called");
  } catch (error) {
    res.status(401).json({
      message: "Error occurred during logout",
      success: false,
      erroe: true,
    });
  }
};
