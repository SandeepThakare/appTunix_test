import mongoose from "mongoose";

var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    age: {
        type: Number,
        required: true,
        minlength: 1
    }
},{
    timestamps: true // save createAt and updateAt as dates
});

var User = mongoose.model('User', UserSchema)

export default User;