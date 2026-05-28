 import jwt from "jsonwebtoken";
 import User from "../models/user.models.js";

 export const protectRoute = async (req, res) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({message:"Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({message:"Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!decoded){
            res.status(404).json({message:"User not found"});
        }
        req.user=user;
        next();

    } catch (error) {
        console.log("Error in Protected Middleware",error.message);
        res.status(500).json({message: "Internal Server Error!"});
    }
 };