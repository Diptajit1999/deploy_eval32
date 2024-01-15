const express=require("express");
const {UserModel}=require("../models/user.model");

const userRouter=express.Router();
const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");


userRouter.post("/register",async(req,res)=>{
    const {username,email,gender,pass,age,city}=req.body

    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(200).send({error:err})
            }else{
                const user=new UserModel({username,email,gender,pass:hash,age,city})
                await user.save();
                res.status(200).send({"msg":"new user Registered"})
            }
        })
    } catch (error) {
        res.status(200).send({"msg":error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body

    try {
        const user=await UserModel.findOne({email})
        bcrypt.compare(pass,user.pass,async(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id,username:user.username},"masai")
                res.status(200).send({"msg":"Login Success","token":token})
            }else{
                res.status(200).send({"err":"Wrong credentials ..."})
            }
        })
    } catch (error) {
        res.status(200).send({"msg":error})
    }
})


module.exports={
    userRouter
}