import mongoose from "mongoose";

const subscriptionSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name of Subscription is required"],
        trim:true,
        minlength:2,
        maxlength:100
    },
    price:{
        type:Number,
        required:[true,"Subscription price is required"],
        min:[0,"Price must be atleast 0"],
    },
    currency:{
        type:String,
        enum:['USD','INR','EUR'],
        default:'INR'
    },
    frequency:{
        type:String,
        enum:['Daily','Weekly','Monthly','Yearly']
    },
    cateogory:{
        type:String,
        enum:['sports','entertainment','news','lifestyle','technology','finance','politics','others'],
        required:[true,"Category is required"]
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'acitve'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=> value<=new Date(),
            message:'Start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function (value){
                return value > this.startDate
            },
            message:'renewal date must be after start date'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    }
},
{timestamps:true});

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            Daily:1,
            Weekly:7,
            Monthly:30,
            Yearly:356
        }
        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }
    if(this.renewalDate<new Date()){
        this.status='expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription",subscriptionSchema);

export default Subscription;