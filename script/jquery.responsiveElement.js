/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var responsiveElement=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{
			width		:	460,
			children	:	'*'
		};
		
		var $option=$.extend($optionDefault,option);
		
		/**********************************************************************/

		this.create=function() 
		{
			this.responsive();
			
			var self=this;
			$(window).on('resize',function() 
			{
				self.responsive();
			});
		};
		
		/**********************************************************************/
		
		this.responsive=function()
		{
			$this.each(function() 
			{
				if(($(this).hasClass('pb-layout-100')) || ($(this).hasClass('theme-layout-100')) || ($(this).hasClass('pb-layout-responsive-0')) || ($(this).hasClass('theme-layout-responsive-0')))
				{
					if($option.children!==null)
						$(this).children($option.children).css({'visibility':'visible'});
				}
				else
				{
					var actualWidth=$(this).actual('outerWidth',{includeMargin:false});

					if($option.children===null)
					{
						if(actualWidth<=$option.width) $(this).addClass($option.className);
						else $(this).removeClass($option.className);				
					}
					else
					{
						if(actualWidth<=$option.width) $(this).children($option.children).addClass($option.className);
						else $(this).children($option.children).removeClass($option.className);	

						$(this).children($option.children).css({'visibility':'visible'});
					}
				}
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.responsiveElement=function(option) 
	{
		var element=new responsiveElement(this,option);
		element.create();
	};
	
	/**************************************************************************/

})(jQuery,document,window);