import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'conversation'
    },
    messageBody: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    authorType: {
        type: String,
        required: true
    }
},{
    timestamps: true // save createAt and updateAt as dates
});

module.exports = mongoose.model('message', messageSchema);