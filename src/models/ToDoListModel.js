const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({

    Username:{type:String},
    ToDoSubject:{type:String},
    ToDoDescription:{type:String},
    ToDoStatus:{type:String},
    ToDoCreateDate:{type:Date},
    ToDoUpdateDate:{type:Date},

},{versionKey:false});

const ToDoListModel = mongoose.model('Todolist',DataSchema);

module.exports = ToDoListModel;