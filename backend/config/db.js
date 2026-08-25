import mongoose from "mongoose";
// import dns from "dns"; // added this

// dns.setServers(["8.8.8.8", "8.8.4.4"]); //added this to resolve the issue with connecting express and mongoose


const connectDB = async ()=>
{
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI, {tls: true,tlsAllowInvalidCertificates: true})
        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
   catch(error)
    {
        console.error('MongoDB connection error:', error.message)

        if (error.reason?.servers)
        {
            for (const [server, description] of error.reason.servers)
            {
                console.error('SERVER:', server)
                console.error('TYPE:', description.type)
                console.error('ERROR:', description.error?.message)
                console.error('ERROR CODE:', description.error?.code)
            }
        }

        process.exit(1)
    }
}

export default connectDB