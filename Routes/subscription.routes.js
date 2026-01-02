import {Router} from "express";

const subRouter=Router();

subRouter.get('/',(req,res)=>res.send({title:"subscription general request as get"}));

subRouter.get('/:id',(req,res)=>res.send({title:"subscription id specific request as get"}));

subRouter.post('/',(req,res)=>res.send({title:"subscription request as post"}));

subRouter.put('/:id',(req,res)=>res.send({title:"Subscription put request for specific user"}));

subRouter.delete('/:id',(req,res)=>res.send({title:"subscription request as delete"}));

subRouter.get('/user/:id',(req,res)=>res.send({title:"subscription request as get user/:id"}));

subRouter.put('/:id/cancel',(req,res)=>res.send({title:"put request from subscription"}));

subRouter.get('/upcoming-renewals',(req,res)=>res.send({title:"upcoming-renewal request as get"}));

export default subRouter;