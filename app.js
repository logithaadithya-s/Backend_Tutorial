import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './Routes/user.routes.js';
import subRouter from './Routes/subscription.routes.js';
import authRouter from './Routes/auth.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import connectToDatabase from './Database/mongobd.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser())
app.use(errorMiddleware);


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