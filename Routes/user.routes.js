import { Router } from "express";

const userRouter=Router();

userRouter.get("/",(req,res)=>res.send({title:"user request as get"}));

userRouter.get("/:id",(req,res)=>res.send({title:"user/:id request as get"}));

userRouter.post("/",(req,res)=>res.send({title:"user request as post"}));

userRouter.put("/:id",(req,res)=>res.send({title:"user request as put"}));

userRouter.delete("/:id",(req,res)=>res.send({title:"user request as delete"}));

export default userRouter;