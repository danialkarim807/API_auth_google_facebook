const {url} = require ('../config/database')
const mongoose = require('mongoose');
const express  = require('express')


const app = express() 

const connection = async()=>{ 
    try{
     await mongoose.connect(url)
     console.log("mongoose is connect")
     app.on("error",(error)=>{
            console.log(error);
            throw error
     })
    }catch(err){ 
       console.log(err)
       throw err
    }
  }
module.exports = connection