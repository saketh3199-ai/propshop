import mongoose from "mongoose";
import dns from "dns"; // added this

dns.setServers(["8.8.8.8", "8.8.4.4"]); //added this to resolve the issue with connecting express and mongoose


const connectDB = async ()=>
{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
    catch(error)
    {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB