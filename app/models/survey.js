var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var SurveySchema=new Schema({
	aware:{type:String,required:true},
	opinion:{type:String,required:true},
	prefer:{type:String,required:true},
	spend:{type:String,required:true},
	recieve:{type:String,required:true},
	farmfresh:{type:String,required:true},
	buy:{type:String,required:true},
	average:{type:String,required:true},
	interest:{type:String,required:true},
	agree:{type:String,required:true},
	veg_nonveg:{type:String,required:true},
	special_Hyd:{type:String,required:true},
	favourite:{type:String,required:true},
	availed_in_Raichur:{type:String,required:true},
	delivery:{type:String,required:true}
	
	
	

});
  

SurveySchema.pre('save',function(next)
	{
          next();

	});

module.exports=mongoose.model('Survey',SurveySchema);
