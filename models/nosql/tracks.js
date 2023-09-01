const mongoose = require('mongoose')
const mongooseDelete = require ("mongoose-delete")
//TAble
const TrackScheme = new mongoose.Schema(

    {
        //Fields
        name:{
            type:String
        },
        album:{
            type:String
        },
        cover:{
            type:String,
         validate:{
            validator: (req) => {
                return true;
            },
            message:"ERROR_URL",
          },
        },
        
        artist:{
            name:{
                type: String,
            },
            nickname:{
                type: String,
            },
            nationality:{
                type: String,
            },
        },
        duration:{
            start:{
                type:Number,
            },
            end:{
                type:Number,
            },
        },
        mediaId:{
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);

//IMplememtar metodo propio con relacion a storage
TrackSchema.statics.findAllData = function (){
 const joinData = this.aggregate([ //Tracks
    {
        $lookup:{
            from: "storages",  // tracks relation with storages
            localField: "mediaId",// PK Tracks.mediaId
            foreignField: "_id",// Storages._id
            as: "audio"
        },
    },
    {
        $unwind:"$audio"
    }
 ]);
 return joinData
};

TrackSchema.statics.findOneData = function (id){
    const joinData = this.aggregate([
       {
        $match:{
            _id:mongoose.Types.ObjectId(id),
        },
       },
        {
           $lookup:{
               from: "storages",
               localField: "mediaId",
               foreignField: "_id",
               as: "audio"
           },
       },
       {
           $unwind:"$audio"
       },
       {
            $match:{
                _id:mongoose.Types.ObjectId(id)
            }
       }
    ]);
    return joinData
   };

TrackScheme.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("tracks", TrackScheme)