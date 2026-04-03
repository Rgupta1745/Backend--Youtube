import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true , 
            unique: true, 
            index: true,
            trim: true , 
            lowercase: true
        },
        email: {
            type: String,
            required: true , 
            unique: true, 
            trim: true , 
            lowercase: true
        },
         fullname: {
            type: String,
            required: true , 
            trim: true , 
            index:true
        },
        avatar: {
            type: String, //cloudinary url 
            required: true , 
        },
        coverImage: {
            type: String, //cloudinary url 
        },
        watchHistory:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
            }
        ],
        password:{
            type: String ,
            unique:true,
            required: [true , "Password is required"], 
        },
        refreshToken:{
            type:String
        }
    }
,{timeStamps:true})

userSchema.pre("save" , async function (next){

    if(!this.isModified("password")){
        return next();
    } 
    this.password =  bcrypt.hash(this.password , 10)
    next()

    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password , this.password)
    }
})

userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User" , userSchema)