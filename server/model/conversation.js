import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participants: [],
    conversationType: {
        type: String,
        required: true,
        default: 'Personal'
    },
    conversationName: {
        type: String,
        default: 'Test'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true // save createAt and updateAt as dates
});

module.exports = mongoose.model('conversation', conversationSchema);