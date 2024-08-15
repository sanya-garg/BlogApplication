const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const {createJWTToken} = require('../services/user');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "./images/default.png"
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();

});

userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const user = await this.findOne({email});

    if(!user) return false;

    const salt = user.salt;
    const userPassword = user.password;

    const passwordProvided = createHmac('sha256', salt)
    .update(password)
    .digest("hex");

    if(userPassword !==passwordProvided){
        return false;
    }

    const token = createJWTToken(user);
    console.log(token);
    return token;

})
const User = mongoose.model('user', userSchema);

module.exports = User;

