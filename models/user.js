import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://abhijithnagula:1234@logindb.bdzgn.mongodb.net/Auth')
  .then(() => console.log('Connected!'));

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }  
})


export default mongoose.model("userAuthentication",UserSchema)