/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateImage=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;
		
		/**********************************************************************/

		this.create=function() 
		{
			$this.each(function() 
			{
				if($this.hasClass('template-component-image-preloader'))
				{
					var box=$(this);
					var image=box.find('img');

					if(image.length===1)
					{
						$(image).one('load',function()
						{
							box.css({'background-image':'none'});
							
							var object=box.children('a').length===1 ? box.children('a') : image;
							
							object.animate({'opacity':1},1000,function() 
							{			

							}); 
						}).each(function() 
						{
							if(this.complete) $(this).load();
						});
					}
				}
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateImage=function() 
	{
		var element=new templateImage(this);
		element.create();
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/