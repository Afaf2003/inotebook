const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwt_Secrete = 'Afafisgoodbo&y';

//ROUTER 1: Creating a new user by validaing this entered credentials through the POST request method '/api/auth/createuser'
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter a Valid Password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // if there are error then return baad request
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send({ result: result.array()});
        return res.status(400).json({ success, result: result.array() })
    }

    //Checking whether the user with this email id is already Exists  
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: 'User with same Email ID Already Exists' })
        }
        //Creating new User
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            //payload object
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_Secrete)
        success = true
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

    // .then(user => res.json(user)).catch(err=>{res.json({error: 'Please Enter an Valid Email Id', message: err.message})})
    // res.send(req.body);
});

//ROUTER 2: Authenticating a new user by validaing this entered credentials POST request method '/api/auth/login'
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Please Enter Password').exists()
], async (req, res) => {
    // if there are error then return baad request
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // return res.send({ result: result.array()});
        return res.status(400).json({success, result: result.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({success, error: "Please Enter Correct Credentials!" });
        }
        //Simpply we are gonna compare the password, it will return a boolean Value
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            res.status(400).json({success, error: "Please Enter Correct Credentials!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_Secrete);
        success = true
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")

    }
});

//ROUTER 3: Fetching user by validaing Token POST request method '/api/auth/getuser'

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select("-password");
        res.json({user})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
});

module.exports = router