const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    age: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
