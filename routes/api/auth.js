const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth'); 
const jwt = require('jsonwebtoken'); 
const config = require('config'); 
const { check, validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs'); 

const User = require('../../models/User')

//Route: GET api/auth 
//Details: Test route 
//Access: Private 
//adds middleware 'auth' to verify for jwt authorization and decode it to check for validation 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //leave off the password
        res.json(user); //return user data back  
    } catch(err) {
        console.error(err.message); 
        res.status(500).send('Server Error')
    }
})

//ROUTE: POST api/auth
//DETAILS: authenicate user, retrieve the validated token to access private routes and actions 
//Access: PRIVATE 
router.post('/', [
    //validators using the express validator for the email and password 
    check('email', 'Email is required').isEmail(), 
    check('password', 'Password is required').exists()
], async (req, res) => {
    //catch the errors and respond with a message with a 400 client bad request, else return normal response. 
    const errors = validationResult(req); 

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    }

    const { email, password } = req.body; 

    try {
        let user = await User.findOne({ email }); 

        if(!user) {
            return res.status(400).json({ errors: [{msg: 'Credentials are invalid'}] }); 
        }

        const isMatch = await bcrypt.compare(password, user.password); //compare plain and hashed password 

        //if no match, return invalid credientials 
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Credentials are invalid' }] })
        }

        //create payload 
        const payload = {
            user: {
                id: user.id
            }
        }

        //siging in jwt token 
        jwt.sign(
            payload, 
            config.get('jwtSecret'), 
            { expiresIn: 360000 }, 
            (err, token) => {
            if(err) throw err; 
            res.json({token}); //send back token 
         }
        ); 

    } catch(err) {
        console.error(err.message); 
        res.status(500).send('Server error'); 
    }

});

module.exports = router; 