const Router = require('express');
const User = require('../models/user');
const {validateToken} = require('../services/user');

const router = Router();

router.post('/signin', async (req, res) => {
    const { email,
        password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        const user = await User.findOne({email});
        if(!user){
            return res.json({message : 'User not found'});
        }
        console.log(user);
        return res.cookie('token', token).json({user: user, token : token, message : 'Valid User'});
    } catch (error) {
        return res.json({ message: 'Incorrect Email or password' });
    }

});

router.post('/signup', async (req, res) => {
    const { username,
        email,
        password } = req.body;
    await User.create({
        username,
        email,
        password
    });

    return res.json({ message: 'User created' });
})


module.exports = router;