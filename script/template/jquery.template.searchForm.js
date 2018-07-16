/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateSearchForm=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;
		
		/**********************************************************************/
		
		this.build=function() 
		{
			$this.on('click',function(e)
			{
				e.preventDefault();
				
				var searchForm=$($option.searchForm);
				if(searchForm.length!==1) return;
				
				searchForm.css({display:'table'}).animate({opacity:0.95},{duration:200,complete:function()
				{
					searchForm.addClass('template-state-open');
				}});
			
				searchForm.children('div:first').on('click',function(e)
				{
					searchForm.animate({opacity:0},{duration:0,complete:function()
					{
						searchForm.css({display:'none'}).removeClass('template-state-open');
					}});
				});
			});
		};

		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateSearchForm=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateSearchForm(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);