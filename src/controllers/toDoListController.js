const ToDoListModel = require('../models/ToDoListModel');

exports.CreateToDo  = (req,res)=>{
    let reqBody = req.body;
    let ToDoSubject = reqBody['ToDoSubject'];
    let ToDoDescription = reqBody['ToDoDescription'];
    let Username = req.headers['username'];
    let ToDoStatus ="New"
    let ToDoCreateDate = Date.now();
    let ToDoUpdateDate = Date.now();

    let postBody = {
        Username:Username,
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoStatus:ToDoStatus,
        ToDoCreateDate:ToDoCreateDate,
        ToDoUpdateDate:ToDoUpdateDate
    }
    
    ToDoListModel.create(postBody,(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.SelectToDo  = (req,res)=>{

    let UserName=req.headers['username'];

    ToDoListModel.find({Username:UserName},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.UpdateToDo  = (req,res)=>{

    let ToDoSubject =  req.body['ToDoSubject'];
    let ToDoDescription = req.body['ToDoDescription'];
    let id = req.body['_id'];
    let ToDoUpdateDate = Date.now();

    let postBody = {
        ToDoSubject:ToDoSubject,
        ToDoDescription:ToDoDescription,
        ToDoUpdateDate:ToDoUpdateDate
    }

    ToDoListModel.updateOne({_id:id},{$set:postBody},{upsert:true},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })

}

exports.RemoveToDo  = (req,res)=>{

    let id = req.body['_id'];

    ToDoListModel.remove({_id:id},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.UpdateStatusToDo  = (req,res)=>{

    let ToDoStatus =  req.body['ToDoStatus'];
    let id = req.body['_id'];
    let ToDoUpdateDate = Date.now();

    let postBody = {
        ToDoStatus:ToDoStatus,
        ToDoUpdateDate:ToDoUpdateDate
    }

    ToDoListModel.updateOne({_id:id},{$set:postBody},{upsert:true},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.SelectToDoByStatus  = (req,res)=>{

    let UserName=req.headers['username'];
    let ToDoStatus =  req.body['ToDoStatus'];

    ToDoListModel.find({Username:UserName,ToDoStatus:ToDoStatus},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

exports.SelectToDoByDate  = (req,res)=>{

    let UserName=req.headers['username'];
    let FromDate =  req.body['FromDate'];
    let ToDate =  req.body['ToDate'];

    ToDoListModel.find({Username:UserName,ToDoCreateDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err) {
            res.status(400).json({status:"fail", data: err});
        }else {
            res.status(200).json({status:"Success", data: data});
        }
    })
}

