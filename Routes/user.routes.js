import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.middleware.js";

const userRouter=Router();

userRouter.get("/",getUsers);

userRouter.get("/:id",authorize,getUser);

userRouter.post("/",(req,res)=>res.send({title:"user request as post"}));

userRouter.put("/:id",(req,res)=>res.send({title:"user request as put"}));

userRouter.delete("/:id",(req,res)=>res.send({title:"user request as delete"}));

export default userRouter;