const express=require("express");
const {PostModel}=require("../models/post.model")
const jwt=require("jsonwebtoken")
const {auth}=require("../middlewares/auth.middleware");
const postRouter=express.Router();


postRouter.post("/add",auth,async(req,res)=>{
    try {
        const posts=await PostModel(req.body)
        await posts.save();
        res.status(200).send({"msg":"A new post has been added"})

    } catch (error) {
        res.status(400).send({"msg": error})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    try {
        const postID=await PostModel({userID:req.body.userID})
        // const post=await PostModel.findOne({_id:postID})
        res.status(200).send(postID)
        // res.status(200).send(post)
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})

postRouter.patch("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params

    try {
        const post=await PostModel.findOne({_id:postID})
        if(req.body.userID==post.userID){
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`updated the posts ${postID}`})
        }else{
            res.status(400).send({"msg":"not authorized to patched"})
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})


postRouter.delete("/update/:postID",auth,async(req,res)=>{
    const {postID}=req.params

    try {
        const post=await PostModel.findOne({_id:postID})
        if(req.body.userID==post.userID){
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":`deleted the posts ${postID}`})
        }else{
            res.status(400).send({"msg":"not authorized to delete"})
        }
    } catch (error) {
        res.status(400).send({"msg":error})
    }
})
module.exports={
    postRouter
}