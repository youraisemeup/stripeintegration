/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateGoToTop=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			new Waypoint(
			{
				element		:	$('body'),
				offset		:	-10,
				handler		:	function(direction) 
				{
					if(direction==='down')
						$this.animate({opacity:1},{duration:1000});
					else $this.animate({opacity:0},{duration:250});
				}
			});

			$(window).on('hashchange',function(e) 
			{
				e.preventDefault();

				var hash=window.location.hash.substring(1);
				if(hash==='go-to-top')
					$.scrollTo(0,{duration:500,easing:'easeInOutCubic',onAfter:function() { window.location.hash='#'; }});
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateGoToTop=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateGoToTop(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/