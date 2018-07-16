/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateTab=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.tabs(
			{
				active			:	$option.active,
				disabled		:	$option.disabled,
				collapsible		:	$option.collapsible,
				heightStyle		:	$option.heightStyle,
				show			:
				{
					easing		:	$option.show.easing,
					delay		:	$option.show.delay,
					duration	:	$option.show.duration
				},
				hide			:
				{
					easing		:	$option.hide.easing,
					delay		:	$option.hide.delay,
					duration	:	$option.hide.duration			
				},
				create			:	function()
				{
					$(this).css('visibility','visible');
				}
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateTab=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateTab(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/