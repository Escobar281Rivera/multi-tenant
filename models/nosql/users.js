const mongoose = require('mongoose')
const mongooseDelete = require ("mongoose-delete")
//TAble
const UserScheme = new mongoose.Schema(

    {
        //Fields
        name:{
            type:String,
        },
        age:{
            type:Number,
        },
        email:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
            select: false,
        },
        role:{
            type:[ "user"," admin "],
            default:"user"
        }
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);
UserScheme.plugin(mongooseDelete, { overrideMethods: "all"});

module.exports = mongoose.model("users", UserScheme)