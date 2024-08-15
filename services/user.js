const JWT = require('jsonwebtoken');

const secret = 'sanya1718';

function createJWTToken(user){
    const payload = {
        _id : user._id,
        email : user.email,
        profileImageURL :user.profileImageURL,
        role : user.role

    };

    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const user = JWT.verify(token, secret);
    return user;
}
module.exports ={
    createJWTToken,
    validateToken
}