var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var SurveySchema=new Schema({
	Name:{type:String,required:true},
	age:{type:String,required:true},
	address:{type:String,required:true},
	gender:{type:String,required:true},
	income:{type:String,required:true},
	eatAndDrink:{type:String,required:true},
	eatEachDay:{type:String,required:true},
	foodBudget:{type:String,required:true},
	buyPlace:{type:String,required:true},
	agree:{type:String,required:true},
	importance:{type:Array,required:true},
	betterBenifits:{type:String,required:true},
	package:{type:String,required:true},
	preference:{type:String,required:true},
	suggestions:{type:String,required:true}
	
	

});
  

SurveySchema.pre('save',function(next)
	{
          next();

	});

module.exports=mongoose.model('Survey',SurveySchema);