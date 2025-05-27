
import User from '../models/user.model.js';
import express from 'express';

const adminRouter = express.Router();


export const makeAdminById =async (req,res)=>{
     try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = 'admin';
    await user.save();
    res.status(200).json({ message: 'User promoted to admin' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to promote user' });
  }
}

export const getAllUsers = async (req,res)=>{
    try{
        const users = await User.find().select('-password');

    }catch(error){
        res.status(500).json({message:"Error fetching users"});
    }
}


export const getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    }catch(error){
        res.status(500).json({message:"Error fetching user"})
    }
}



export const findByIdAndUpdate=async (req,res)=>{
    try{
         const user= await User.findById(req.params.id)
    if(!user){
        res.status(404).json({message:"User not found"});
    }
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email
    await user.save()
    res.send(200).json({message:"User updated"})

    }catch(error){
        res.status(500).json({message:"Error updating user"});
    }
   
}


export const deleteUserById = async (req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not foudn"});
        }
        res.status(200).json({message:"User deleted successfully"});
        await user.save();

    }catch(error){
        res.status(500).json({message:"Error deleting the user"})
    }
}








