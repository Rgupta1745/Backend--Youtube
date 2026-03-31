import "dotenv/config"; // MUST be first
import connectDB from './db/dbconnect.js';
import app from "./app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 ,() =>{
        console.log(`Server is ruuning on the ${process.env.PORT}`);
        
    })
})
.catch((err) =>{
    console.log("Mongo db connection failed !!!!" ,err);
    
})









/* FIRST APPROCH 
import express from 'express'
const app = express()

( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error" , (error) =>{
            console.log('Error: ' , error);
            
        })
        app.listen(process.env.PORT ,() =>{
            console.log(`App is listen on the port ${process.env.PORT} `);
            
        });

    } catch (error) {
        console.log("Error :" , error);
        throw error
    }
})()*/