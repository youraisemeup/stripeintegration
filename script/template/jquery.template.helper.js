/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateHelper=function()
	{
		/**********************************************************************/
		
		this.getRandomId=function(prefix) 
		{
			var string='';
			for(var i=0;i<16;i++) string+=String.fromCharCode(this.getRandomNumber(65,90));
			return(prefix+string);
		};
		
		/**********************************************************************/
		
		this.getRandomNumber=function(min,max)
		{
			return((Math.floor(Math.random()*(max-min)))+min);
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateHelper=function() 
	{
		return(new templateHelper(this));
	};
	
	/**************************************************************************/

})(jQuery,document,window);