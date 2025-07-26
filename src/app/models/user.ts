
import { match } from "assert";
import mongoose from "mongoose";
import { models } from "mongoose";

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        required: [true , "Email is required"],
        unique:true,
        trim: true,//quitar los espacios vacíos
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email address"]
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        select: false, //no mostrar la contraseña en las consultas
    },
    fullname:{
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        minLength: [3, "Fullname must be at least 3 characters"],
        maxLength: [50, "Fullname must be at most 50 characters"],
    }
},{
    timestamps:true,
});

const User = models.User || mongoose.model('User', userSchema);
export default User;