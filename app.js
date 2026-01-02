import express from 'express';

const app = express();

import userRouter from './Routes/user.routes.js';
import subRouter from './Routes/subscription.routes.js';
import authRouter from './Routes/auth.routes.js';

import connectToDatabase from './Database/mongobd.js';
const PORT = process.env.PORT;

app.use("/api/v1/auth",authRouter);

app.use("/api/v1/user",userRouter);

app.use("/api/v1/subscriptions",subRouter);

app.get('/',(req,res)=>{
    res.send({hello:"world"});
});

app.listen(PORT,async ()=>{
    console.log(`Server is running on ${process.env.NODE_ENV} http://localhost:${PORT}`);

    await connectToDatabase();
});
export default app;