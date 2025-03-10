import mongoose from "mongoose";

const connectDB=async()=>{
mongoose.connection.on("connected",()=>{
    console.log("love you too from mongodb");  
})
await mongoose.connect(process.env.MONGODB_URL+'/appointment')
}

export default connectDB


