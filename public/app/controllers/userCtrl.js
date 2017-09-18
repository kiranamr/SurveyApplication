angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,$location,$timeout,User)
{
	var app=this;
	app.regUser=function(regData)
	{  
		app.loading=true;
		app.errorMsg=false;
		app.successMsg=false;
	console.log('form submitted');
	
	User.create(app.regData).then(function(data) 
	{

         console.log(data.data.success); 
         console.log(data.data.message);
         if(data.data.success)
         {
         	app.loading=false;
              app.successMsg=data.data.message+'...Redirecting';
              $timeout(function(){$location.path('/login');
               },2000);

         } 
         else 
         {
          
         	   app.loading=false;
               app.errorMsg=data.data.message;
                 $timeout(function(){$location.path('/register');
               window.location.reload(true);
            

                app.errorMsg=false;
                },3000);
         }

	});


};
});