import {Router} from "express";

const authRouter=Router();

authRouter.post("/sign-up",(req,res)=>res.send({title:"sign up request as post"}));

authRouter.post("/sign-in",(req,res)=>res.send({title:"sign in request as post"}));

authRouter.post("/sign-out",(req,res)=>res.send({title:"sign out request as post"}));

export default authRouter;