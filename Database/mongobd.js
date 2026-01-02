import mongoose from "mongoose";

if(!process.env.DB_URI){
    throw new Error("No DB_URI in the env file");
}
const connectToDatabase = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("MongoBD is connected");
    }catch(error){
        console.error("Error connecting database:",error);
        process.exit(1);
    }
}

export default connectToDatabase;