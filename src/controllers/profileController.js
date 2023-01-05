const ProfileModel = require('../models/profileModel');
var jwt = require('jsonwebtoken');

exports.CreateProfile  = (req,res)=>{
    let reqBody = req.body;
    ProfileModel.create(reqBody,(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.UserLogin  = (req,res)=>{
    let Username = req.body['Username'];
    let Password = req.body['Password'];

    ProfileModel.find({Username:Username,Password:Password},(err,data)=>{
        if(err){
            res.status(400).json({status:"failed",data:"data"});
        }
        else{
            if(data.length>0){
                // Creaat Auth Token
                payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data: data[0]
                }
                var token = jwt.sign(payload, 'secretKey54321');


                res.status(200).json({status:"Success",token:token,data:data});
            }
            else{
                res.status(401).json({status:"Unauthorized"})
            }
        }        
    })  
}

exports.SelectProfile  = (req,res)=>{

    let UserName1=req.headers['username'];
    let UserName="admin"
    ProfileModel.find({Username:UserName1},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })

}

exports.UpdateProfile  = (req,res)=>{

    let UserName=req.headers['username1'];
    let reqBody = req.body;

    ProfileModel.updateOne({Username:UserName},{$set:reqBody},{upsert:true},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })

}

