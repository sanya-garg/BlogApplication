const mongoose = require('mongoose');

async function connectDB(url){
    return mongoose.connect(url)
    .then(() => console.log('Mongoose Connected')) // return promise
    .catch((err) => console.log('Mongoose Error', err));
};

module.exports ={
    connectDB
}