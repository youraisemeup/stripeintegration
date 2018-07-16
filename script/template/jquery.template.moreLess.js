/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateMoreLess=function(object,option)
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
				$this.children('span').toggle();
				
				if($this.next('.template-component-more-content').length===1)
					$this.next('.template-component-more-content').toggle();
				else $this.prev('.template-component-more-content').toggle();
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateMoreLess=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateMoreLess(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/