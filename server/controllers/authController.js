import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).json({ message: "Please provide all the fields" });

  try {
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(409).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User registered",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Please provide all the fields" });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m"
      }
    );

    const refreshToken = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: "7d"
        }
    )

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({
      message: "Log in successful",
      accessToken,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });

    

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) =>{
    const token = req.cookies.refreshToken;

    if(!token) return res.status(401).json({message: "Unauthorized"})
    
    try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        const newAccessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: "15m"
            }
        )

        res.status(200).json({
            message: "OK",
            accessToken: newAccessToken,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = async (req, res) =>{
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        res.status(200).json({message: "Logged out successfuly"});

    } catch (err) {
        console.log("Error logging out: ", err)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMe = async (req, res) =>{
  try {
    const user = await User.findById(req.user.id).select("-password")

    if(!user) return res.status(401).json({message: "User not found"})

    res.status(200).json({
      message: "OK",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  } catch (err) {
    console.log("Get me error: ", err)
    res.status(500).json({message: "Internal Server Error"})
  }

}