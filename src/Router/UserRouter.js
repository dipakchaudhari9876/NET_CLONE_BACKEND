const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('./../Schema/UserSchema')
const authenticate = require('../middleware/authenticate')

router.post('/register',async(req,res)=>{
    try{
        const {email,password,Cpassword} = req.body
        const EmailCheck = await User.findOne({email})
        if(EmailCheck){
            return res.status(400).json({error:"User already registered"})
        }

        const EncPass = await bcrypt.hash(password,12)
        if(EncPass){
            const UploadData = new User({
                email,password:EncPass,Cpassword:EncPass
            })
            const saveData = await UploadData.save()
            return res.status(200).json({message:"User registered"})
        }

        
    }catch(err){
            return res.status(400).json({error:"Invalid Credentials"})
            // console.log(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body

        const emailCheck = await User.findOne({email})
        if(!emailCheck){
            return res.status(400).json({error:"Invalid Credentials"})
        }

        const decPass = await bcrypt.compare(password,emailCheck.password)
        if(decPass){
            const token = jwt.sign({id:emailCheck._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            return res.status(200).json({message:"Login Successfull",token})
        }

    }catch(err){
        return res.status(400).json({error:"Invalid Credentials"})
    }
})

router.get('/details',authenticate,async(req,res)=>{
    try{
        return res.status(200).json({email:req.email})
    }catch(err){
        console.log(err)
    }
})

module.exports = router