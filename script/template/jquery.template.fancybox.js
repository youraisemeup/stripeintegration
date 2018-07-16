/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateFancybox=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.fancybox(
			{
				type				:	'image',
				live				:	true,
				helpers				:	
				{
					title			:	
					{
						type		:	'inside'
					},
					buttons			:
					{
						skipSingle	:	true
					}
				},
				afterLoad			:	function()
				{
					this.title=$(this.element).nextAll('.template-component-image-description').html();
				}		
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateFancybox=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateFancybox(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/