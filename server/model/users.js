import mongoose from "mongoose";
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    personal: {
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
        },
    },
    address: {
        houseno: {
            type: Number,
            required: true,
            minlength: 1
        },
        street: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        state: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        country: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        zip: {
            type: Number,
            required: true,
            minlength: 1
        },
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User', UserSchema)

export default User;