const mongoos=require('mongoose');

const userSchema=new mongoos.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User=mongoos.model("User",userSchema);

module.exports=User;