//here we will be coding for databse connection 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/employee');
// this is to check the connection is open or not
var conn = mongoose.connection;
conn.on('connected', function(){
    console.log('database connected successfully');
});
conn.on('disconnected', function(){
    console.log('database disconnected');
});
conn.on('error', console.error.bind(console, 'connection error:'));
//how we will create a schema employee and its mode
var employeeschema = new mongoose.Schema({
    name : String,
    email:String ,
    type: String,
    hourly_rate : Number ,
    total_hrs : Number


})
//now for model with name of employee
var employeemodel = mongoose.model('employee', employeeschema) ;
//now we will export this model 
module.exports = employeemodel;
// now we call this model in our routes file for eg 
// var employee = require('../modules/employee');

