const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Fetchuser=require('../middleware/Fetchuser');
const secret='boyisgood'

// create a user using:post /api/auth .doesn't require auth
router.post('/cruser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 7 }),
], async (req, res) => {
    // if there are errors return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
        return res.status(400).json({ success,errors: errors.array() });
    }
    // check whether the email exists already or not
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success=false
            return res.status(400).json({ success,error: "sorry user exists" });
        }
        // user = await User(req.body);
        // user.save();
        var salt =await bcrypt.genSaltSync(10);
        secPass=await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,secret);
        success=true
        res.json({success,authtoken});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }

})

// route-2 get data user
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),

],async (req, res) => {
    // if there are errors return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({ success,error: "Login details not found" });
        }
        const passcomp=bcrypt.compare(password,user.password);
        if(!passcomp){
            success=false;
            return res.status(400).json({success,error: "Login details not found" });
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,secret);
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured2");
    }
});

// route-3
router.post('/getuser',Fetchuser , async (req, res) => {
try{
    userid=req.user.id;
    const user=await User.findById(userid).select("-password");
    res.send(user);
}catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured");
    }
})
module.exports = router;
