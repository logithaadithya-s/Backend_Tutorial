import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp= async (req,res,next) => {
    const session =await mongoose.startSession();
    session.startTransaction();
    
    try{
        const {name,email,password}=req.body;

        const exisitingUser= await User.findOne({email});
        if(exisitingUser){
            const error=new Error("User already exsists");
            error.statusCode=409;
            throw error;
        }

        const salt =await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const newUsers =await User.create({name,email,password:hashedpassword});

        const token = jwt.sign({userId:newUsers._id}
            ,process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();
        res.status(201).json(
            {
                success:true,
                message:'User created successfully',
                data:{
                    token,
                    User:newUsers
                }
            }
        );

    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn= async (req,res,next) => {
    try{
        const {email,password} =req.body;
        const user=await User.findOne({email});
        if(!user){
            const error = new Error("User not found");
            error.statusCode=404;
            throw error;
        }
        const isPasswordVaild =await bcrypt.compare(password,user.password);
        if(!isPasswordVaild){
            const error = new Error("Password wrong");
            error.statusCode=401;
            throw error;
        }
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );
        res.status(200).json({
            success:true,
            message:"User logged in successful",
            data:{
                token,
                user
            }
        });
    }catch(error){
        next(error);
    }
}
export const signOut= async (req,res,next) => {
    
}
