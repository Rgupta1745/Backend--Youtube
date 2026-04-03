import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = mongoose.Schema(
    {
        videoFile: {
            type:String , //cloudnary url 
            require:true
        },
        thumbnail: {
            type:String , //cloudnary url 
            require:true
        },
        title: {
            type:String , 
            require:true
        },
        discription: {
            type:String ,
            require:true
        },
        duration: {
            type: Number, // cloudary 
            required: true
        },
        views: {
            type:Number,
            default:0
        },
        isPublished: {
            type:Boolean,
            deafutl :true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref :"User"
        }


    },{timeStamps:true})


videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video" , videoSchema)