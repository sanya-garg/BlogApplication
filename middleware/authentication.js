const { validateToken } = require("../services/user");

function checkForAuthenticationAndCookie(){
    return (req,res,next) =>{
        //const tokenCookieValue = req.cookies[cookieName];
        const token = req.headers['authorization'];
        const tokenCookieValue = token.split("Bearer ")[1];
        console.log(tokenCookieValue);
        if(!tokenCookieValue){
            next();
        }

        const user = validateToken(tokenCookieValue);
        req.user = user;
        next();
    }
}

module.exports = {
    checkForAuthenticationAndCookie
}