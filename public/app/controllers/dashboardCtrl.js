angular.module('dashboardControllers',[])
.controller('dashboardCtrl',function($scope,$timeout,Survey,$location,$http)
{
  $scope.surveys=[];
   $scope.surveys1=[];
      $scope.selectDays = ['Support local farmers',
'Fewer transport miles',
'Support local economy',
'Food is fresher/tastier',
'Food is better quality',
'Food is cheaper',
'You know where the food comes from',
'Food has fewer additives',
'Food is healthier'
];
  console.log($scope.surveys);
	   var app=this;
     app.loading=true;
    app.errorMsg=false;
    app.successMsg=false;
  var app=this;
  app.regSurvey=function(regData)
  {  
    app.loading=true;
    app.errorMsg=false;
    app.successMsg=false;
  console.log('form submitted');
  
  Survey.create(app.regData).then(function(data) 
  {

         console.log(data.data.success); 
         console.log(data.data.message);
         if(data.data.success)
         {
          app.loading=false;
              app.successMsg=data.data.message+'...Redirecting';
              $timeout(function(){$location.path('/dashboard');
               window.location.reload(true);
            

                app.successMsg=false;
                },3000);

         } 
         else 
         {
          
             app.loading=false;
               app.errorMsg=data.data.message;
                 $timeout(function(){$location.path('/dashboard');
               window.location.reload(true);
            

                app.errorMsg=false;
                },3000);
         }

  });


};
  
});