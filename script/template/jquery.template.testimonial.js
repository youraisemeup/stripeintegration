/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateTestimonial=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{			
			$this.children('ul:first').carouFredSel(
			{
				circular				:	true,
				inifinite				:	false,
				direction				:	'left',
				responsive				:	true,
				items					:
				{
					start				:	0,
					height				:	'variable',
					visible				:	1,
					minimum				:	1
				},
				scroll					:
				{
					fx					:	'fade',
					items				:	1,
					easing				:	'swing',
					duration			:	300,
					pauseOnHover		:	false
				},
				auto					:
				{
					play				:	true,
					timeoutDuration		:	6000
				},
				swipe					:
				{
					onTouch				:	true,
					onMouse				:	true
				},
				prev					:
				{
					button				:	$this.find('.template-component-testimonial-list-navigation-left')
				},
				next					:
				{
					button				:	$this.find('.template-component-testimonial-list-navigation-right')
				}				
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateTestimonial=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateTestimonial(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/