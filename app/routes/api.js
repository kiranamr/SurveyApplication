var User=require('../models/user');
var json2xls=require('json2xls');
var Survey=require('../models/survey');
var server= require('http');
var jwt=require('jsonwebtoken');
var json2csv = require('json2csv');
var fs1 = require('fs');
var fieldNames = [   'Name',
					 'Gender',
					 'Age',
					 'Monthly Income',
					 'How often do you eat fruits and berries or drinking fruit juice?',
					 'Approximately how many portions of fresh fruit and vegetables do you eat each day?',
					 'On average, what portion of your weekly food budget is spent on fresh fruits and vegetables?',
					 'Where do you buy most of your fresh fruits and vegetables?',
					 'Please select the top 3 factors from the list below that motivate you to purchase fresh local fruits?',
					 'As an end consumer I, prefer for quality than for price, how would u agree to this statement?',
					 'Which of the following form of Pomegranate offer you the better benefits as a consumer?',
					 'Which type of package you prefer the most?',
					 'Rank the following according to your taste and preference',
					 'Any suggestions for the improvement of the product',
					 'Address'

					 ];

//var mongoXlsx = require('mongo-xlsx');
var fields = [  'Name', 
				'gender', 
				'age',
				'income',
				'eatAndDrink',
				'eatEachDay',
				'foodBudget',
				'buyPlace',
				'importance',
				'agree',
				'betterBenifits',
				'package',
				'preference',
				'suggestions',
				'address'
				];

var fs = require('file-system');
var secret ='kiran';
/*var CheckInDate=new Date();
		var d=CheckInDate.getDate();
		var m=CheckInDate.getMonth()+1;
		var y=CheckInDate.getFullYear();
		if (d < 10) 
		{
  		  d = '0' + d;
        }
        if (m < 10)
        {
          m = '0' + m;
        }
		CheckInDate=y+'-'+m+'-'+d;
var CheckOutDate=new Date();
var cd=CheckOutDate.getDate();
if(cd<=31)
{
 cd=cd+2;
}
else
{
cd=1;
}
		

		var cm=CheckOutDate.getMonth()+1;
		var cy=CheckOutDate.getFullYear();
		if (cd < 10) 
		{
  		   cd = '0' + cd;
        }
        if (cm < 10) 
        {
          cm = '0' + cm;
        }
		CheckOutDate=cy+'-'+cm+'-'+cd;*/

module.exports=function(router){




router.post('/users',function(req,res)
	{
		var user=new User();
		user.firstname=req.body.fname;
		user.lastname=req.body.lname;
		user.username=req.body.username;
		user.password=req.body.password;
		user.mobile=req.body.mobile;
		user.email=req.body.email;
		if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email=='')
		{
			res.json({success:false,message:'Ensure username or email and password were provided'});

		}
		else
		{

		user.save(function(err)
		{
				if(err)
				{
					if(err.errors != null)
					{
						if(err.errors.firstname)
						{
						return	res.json({success:false,message:err.errors.firstname.message});
						}
						else
						if(err.errors.lastname)
						{
						return	res.json({success:false,message:err.errors.lastname.message});
						}
						else
						if(err.errors.email)
						{
						return	res.json({success:false,message:err.errors.email.message});
						}
						else
						if(err.errors.username)
						{
						return	res.json({success:false,message:err.errors.username.message});
						}
						else
						if(err.errors.password)
						{
						return	res.json({success:false,message:err.errors.password.message});
						}
						if(err.errors.mobile)
						{
						return	res.json({success:false,message:err.errors.mobile.message});
						}
						else{
						return	res.json({success:false,message:err});
						}
					}
				    
		else if(err)
		{
			if(err.code == 11000)
			{
				
				
				return	res.json({success:false, message:'username or email or phone number already exists  !!!'});
				
			
			
		 	}			
			else
			{
			return	res.json({success:false, message: err});
			}
			
		}
		
		}
		else
		{
	return	res.json({success:true, message:'user created !'});
	     }
	    });
		}
		
	});

    // Route to get the current user's permission level
    router.get('/permission', function(req, res) 
    {
        User.findOne({ username: req.decoded.username }, function(err, user) 
        {
            
               if(err) throw err;
                if (!user) {
                    res.json({ success: false, message: 'No user was found' }); // Return an error
                } else {
                    res.json({ success: true, permission: user.permission }); // Return the user's permission
                }
            });
        });
    
     // Route to get all users for management page
    router.get('/management', function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
              
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                User.findOne({ username: req.decoded.username }, function(err, mainUser) {
                    if (err) {
                      
                      if(err) throw err;
                        res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
                    } else {
                        // Check if logged in user was found in database
                        if (!mainUser) {
                            res.json({ success: false, message: 'No user found' }); // Return error
                        } else {
                            // Check if user has editing/deleting privileges 
                            if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                                // Check if users were retrieved from database
                                if (!users) {
                                    res.json({ success: false, message: 'Users not found' }); 
                                    // Return error
                                } else {
                                    res.json({ success: true, users: users, permission: mainUser.permission }); // Return users, along with current user's permission
                                }
                            } else {
                                res.json({ success: false, message: 'Insufficient Permissions' }); // Return access error
                            }
                        }
                    }
                });
            }
        });
    });

router.post('/surveydata',function(req,res)
	{
		
		var surveytable=new Survey();
		surveytable.Name=req.body.name;
		surveytable.age=req.body.age;
		surveytable.address=req.body.address;
		surveytable.gender=req.body.gender;
		surveytable.income=req.body.income;
		surveytable.eatAndDrink=req.body.eatAndDrink;
		surveytable.eatEachDay=req.body.eatEachDay;
		surveytable.foodBudget=req.body.foodBudget;
		surveytable.buyPlace=req.body.buyPlace;
		surveytable.agree=req.body.agree;
		surveytable.importance=req.body.importance;
		surveytable.betterBenifits=req.body.betterBenifits;
		surveytable.package=req.body.package;
		surveytable.preference=req.body.preference;
		surveytable.suggestions=req.body.suggestions;
		if(req.body.suggestions==null||req.body.suggestions==''||req.body.preference==null||req.body.preference==''||req.body.package==null||req.body.package==''||req.body.betterBenifits==null||req.body.betterBenifits==''||req.body.agree==null||req.body.agree==''||req.body.buyPlace==null||req.body.buyPlace==''||req.body.foodBudget==null||req.body.foodBudget==''||req.body.name==null||req.body.name==''||req.body.age==null||req.body.age==''||req.body.address==null||req.body.address==''||req.body.gender==null||req.body.gender==''||req.body.income==null||req.body.income==''||req.body.eatAndDrink==null||req.body.eatAndDrink==''||req.body.eatEachDay==null||req.body.eatEachDay=='')
		{
			res.json({success:false,message:'Ensure all fields  were provided'});

		}
		else
		{

			surveytable.save(function(err){
		 if (err) throw err;
		
		return res.json({success:true, message:'Survey data created !'});
		
	     
	    });
		}
		
	});

		
router.get('/surveydata',function(req,res)
{
// get all the users
console.log('I recived a get request');
Survey.find(function(err, surveys) {
 
var csv = json2csv({ data: surveys, fields: fields ,fieldNames: fieldNames});
  	res.json(surveys);
        
		fs1.writeFile('file.csv', csv, function(err) {
  if (err) throw err;
  console.log('file saved');
});

 
});
});

router.get('/count',function(req,res)
{
	
		console.log('I recieved a get request controller 1')
		Survey.aggregate({$match:{eatAndDrink:"Daily",income:"10000"}},{$group:{_id:"$tagtype",count:{$sum:1}}},function(err,doc)
		 {
		console.log(doc);
		res.json(doc);
		 });

});
router.get('/downloads', function(req, res){
var path = require('path');
var mime = require('mime');
  var file = "D:\\surveyapp\\file.csv";

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);


  var filestream = fs.createReadStream("D:\\surveyapp\\file.csv");
  filestream.pipe(res);
});

router.get('/checkuser',function(req,res)
{
// get all the users
console.log('I recived a get request');
User.find({}, function(err, users) {
  if (err)
  	res.send(err);

  	res.json(users);
  

 
});
});


router.post('/authenticate',function(req,res){
User.findOne({ username:req.body.username}).select('firstname lastname  username email password mobile').exec(function(err,user)
{
	if(err) throw err;
	if(req.body.username==null||req.body.username==''||req.body.password==null||req.body.password=='')
		{
			res.json({success:false,message:'Ensure username or  password  were provided'});

		}
		else{
	if(!user)
	{
		return res.json({success:false,message:'Could not authenticate user . Please register first...'});
	}
	else if(user)
	{
		if(req.body.password)
		{
		var validPassword=user.comparePassword(req.body.password);
	          }
	          else
	          {
	          return	res.json({success:false,message:'No password provded !'});
	          }

		if(!validPassword)
		{
			return res.json({success:false,message:'Could not authenticate password'});
		}else
		{
			 var token= jwt.sign({username:user.username,email:user.email,firstname:user.firstname,lastname:user.lastname,mobile:user.mobile },secret,{ expiresIn:'24h'});
			  return res.json({success:true,message:'User authenticated !',token:token});
		}
	}
}

});
});


  router.get('/downloads', function(req, res){
var path = require('path');
var mime = require('mime');
  var file = "G:\\loginapp\\downloads\\data.xlsx";

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);


  var filestream = fs.createReadStream("G:\\loginapp\\mongoXlsx");
  filestream.pipe(res);
});

 router.use(function(req,res,next)
  {
  	var token=req.body.token||req.body.query||req.headers['x-access-token'];
  	if(token)
  	{
  		jwt.verify(token,secret,function(err,decoded)
  		{
  			if(err)
  			{
  				res.json({success:false,message:'Token invalid'});
  			}
  			else
  			{
  				req.decoded=decoded;
  				next();
  			}
  		});
  	}
  	else
  	{
  		res.json({success:false,message:'No token provided'});
  	}

  });

  
  router.post('/me',function(req,res)
  {
  	res.send(req.decoded);
  });



return router;
}