const express=require("express");
const {connection}=require("./db");
const cors=require("cors")
const app=express();
const {userRouter}=require("./routes/user.route")
const {postRouter}=require("./routes/post.route")
app.use(express.json());
app.use(express.json())
app.use(cors());


app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(8080,async()=>{
    try {
        await connection;
        console.log("my db is running")
        console.log("server is running at port 8080")
    } catch (error) {
        console.log(error)
    }
})