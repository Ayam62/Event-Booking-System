
import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from "../utils/sendmail.js";


const port=process.env.PORT

export const registerUser = async (req,res)=>{
    try{
    const {name,email,password}=req.body;
  
    const userExists =await User.find({email});
    if(userExists.length>0){
        return res.status(400).json({message:"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt);
    
    const user = new User({
        name,
        email,
        password:hashedPassword,
        role:"user"
    });
    console.log(user);
    
        await user.save();
        res.status(201).json({message:"User created successfully"});
    } catch (error) {
        res.status(500).json({message:"Error creating user"});
    }
}


export const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        //console.log(email,password)
     
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
     
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //create token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30d"});
        console.log(user._id,user.name,user.email)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token
        })
        }catch (error) {
            res.status(500).json({message:"Error logging in"});
        }
    }

export const logoutUser =async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status (200).json({message:"User logged out successfully"});
    }catch (error) {
        res.status(500).json({message:"Error logging out"});
    }
}  


export const forgotPassword =async(req,res)=>{
    try{
        const {email}=req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30m"});

        const url = `http://localhost:${port}/api/auth/reset-password/${user._id}/${token}`;
        const message = `Click on the link to reset your password: ${url}`;

        await sendMail({
            to:user.email,
            subject:"Reset Password",
            text:message
        });
        res.status(200).json({message:"Email sent successfully"});
    }
    catch (error) {
        res.status(500).json({message:"Error sending email"});
    }
}

export const resetPassword =async(req,res)=>{
    try{
        const {password}=req.body;
        const {id,token}=req.params;
      
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
     
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        if(!verified){
            return res.status(400).json({message:"Invalid token"});
        }
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
    
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({message:"Password reset successfully"});

        }catch (error) {
            res.status(500).json({message:"Error resetting password"});
        }
    }

