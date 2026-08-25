import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors'


//THE FOLLOWING BELOW ARE IMPORTING DATA
import users from "./data/users.js";
import products from "./data/products.js";
//THE FOLLOWING ABOVE ARE IMPORTING DATA

//THE FOLLOWING BELOW IMPORT MODELS
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
//THE FOLLOWING ABOVE IMPORT MODELS

import connectDB from "./config/db.js";
dotenv.config()
connectDB()







const importData = async ()=>
{
    try
    {
        //Delete ORDERS,USERS,PRODUCTS
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()



        //await MODEL.QUERY_CMD(DATA) 
        //THE FOLLOWING createdUsers is a ARRAY OF OBJECTS where each OBJECT is USER-OBJECT
        const createdUsers = await User.insertMany(users)
        //If you have any doubts in the below line, just map the above createdUsers to users.js in data folder
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map
        (
            (product)=>
            {
                return {...product,user:adminUser}
            }
        )

        //THIS IS IMPORTANT LINE TO REMEMBER
        await Product.insertMany(sampleProducts)
       
        
        console.log('Data Imported!'.green.inverse)
        process.exit()

    }
    catch(error)
    {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}












const destroyData = async ()=>
{
    try
    {
        //Delete ORDERS,USERS,PRODUCTS
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        console.log('Data Destroyed!'.green.inverse)
        process.exit()


    }

    catch(error)
    {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}











if (process.argv[2]==='-d')
{
    destroyData()
}
else
{
    importData()
}