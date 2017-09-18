var express=require('express');
var app=express();
var port=process.env.PORT || 3000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var path=require('path');
var server= require('http');
var json2xls=require('json2xls');

var fs = require('file-system');
var bodyParser = require('body-parser');
var router=express.Router();

mongoose.Promise = global.Promise;
var appRoutes=require('./app/routes/api')(router);


app.use(morgan('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);



mongoose.connect('mongodb://localhost:27017/SurveyDb',function(err)
	{
		if(err)
		{
			console.log("Database not connected "+ err);
		}
		else
		{
			console.log("Database is connected");
		}
	});

app.get('*',function(req,res)
{
res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
});

app.listen(port,function(){
console.log("Server running on port "+port)
});
