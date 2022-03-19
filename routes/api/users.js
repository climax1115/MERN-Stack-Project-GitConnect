const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator'); 
//bring in users body 
const User = require('../../models/User'); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 

//ROUTE: POST api/users 
//DETAILS: Registers the user  
//Access: PUBLIC 
router.post('/', [
    //validators using the express validator for the name, email, and password 
    check('name', 'Please enter a name').not().isEmpty(), 
    check('email', 'Email is required').isEmail(), 
    check('password', 'Enter a password that is 8 or more characters').isLength({min: 8})
], async (req, res) => {
    //catch the errors and respond with a message with a 400 client bad request, else return normal response. 
    const errors = validationResult(req); 

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    }

    const { name, email, password } = req.body; 

    try {
        let user = await User.findOne({ email }); 

        if(user) {
            return res.status(400).json({ errors: [{msg: 'User already exists'}] }); 
        }

        //grabs user avatar if photo exists, otherwise use default photo
        const avatar = gravatar.url(email, {
            s: '250', 
            r: 'pg', 
            d: 'mm'
        })

        //create a new user 
        user = new User({
            name, 
            email, 
            avatar, 
            password
        }); 

        //Hashing the newly created password 
        const salt = await bcrypt.genSalt(10); //adds a default recommendation of 10 rounds 

        user.password = await bcrypt.hash(password, salt); //brings back a promise 
        //save to database 
        await user.save(); //brings back a promise 

        //create payload 
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: 360000 }, 
            (err, token) => {
            if(err) throw err; 
            res.json({token}); 
         }
        ); 

    } catch(err) {
        console.error(err.message); 
        res.status(500).send('Server error'); 
    }

});

module.exports = router; 

