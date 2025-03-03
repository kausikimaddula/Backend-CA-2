const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const User = require("./schema")

const port=process.env.PORT 
const app = express()
app.use(express.json())
app.use(cors)


app.post('/book',async(req,res)=>{
    try {
        const{title,author,genre,publishedYear,availableCopies}=req.body
        const newbook= new User({title,author,genre,publishedYear,availableCopies})
        if(!title||!author||!genre||!publishedYear||!availableCopies){
            return res.status(404).json({message:"all fields are required"})
        }
        await newbook.save()
        return res.status(200).json({message:"saves", newbook})
        
    } catch (error) {
        console.log(error)
        
    }

})

app.get('/book',async(req,res)=>{
    return res.status(201).json({message:"successfully created"})
})


const db=async()=>{
    try {
        await mongoose.connect(process.env.mongodb)
        console.log('connected')
        
    } catch (error) {
        console.log(error)
        
    }
}
db();

app.put('/book/:id', async(req,res)=>{
    try {
        const updated = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!updated){
            res.status(400).json({message:"Book not found"})
        }
        res.status(200).json({message:"Book is updated"})

        
    } catch (error) {
        res.status(500).json({message:"internal server error "})
        
    }
})

app.delete('/book/:id',async(req,res)=>{
    try {
        const deleted = await User.findByIdAndDelete(req.params.id,req.body,{new:true})
        if(!deleted){
            
            res.status(400).json({message:"not deleted"})
        }
        res.status(200).json({message:"Deleted"})
        
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
})

app.listen(port,()=>{
    console.log(`successfully created http://localhost:${port}`)
})

















