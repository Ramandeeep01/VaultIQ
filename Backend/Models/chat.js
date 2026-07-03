const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vault: {
        type: Schema.Types.ObjectId,
        ref: 'Vault',
        required: true,
    },
},
{
    timestamps: true,
});

const Chat = model('Chat', chatSchema);
module.exports = Chat;