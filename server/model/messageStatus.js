import mongoose from 'mongoose';

const messageStatusSchema = new mongoose.Schema({
    messageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'messages'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    readStatus: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true // save createAt and updateAt as dates
});

module.exports = mongoose.model('messageStatus', messageStatusSchema);