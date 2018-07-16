/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateCounter=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			if($option.type==='percentage')
			{
				var maxValue=0;
				$this.children('ul').children('li').each(function() 
				{
					var value=parseInt($(this).children('span.template-value').text(),10);
					if(maxValue<value) maxValue=value;
				});
			}
			
			$this.children('ul').children('li').each(function() 
			{
				var value=$(this).children('span.template-value');
				
				var limit=parseInt(value.text(),10);
				var symbol=value.text().split(' ')[1];
				
				if(typeof(symbol)==='undefined') symbol='';
				
				if($option.type==='percentage')
				{
					var barOuter=$(document.createElement('div'));
					var barInner=$(document.createElement('div'));
					$(this).append(barOuter.append(barInner));
				}
				
				value.css({'display':'inline-block'}).html('0'+symbol);
				
				$(this).waypoint(function()
				{
					var duration=2000;
					var interval=duration/limit;
					
					for(var i=0;i<=limit;i++)
					{
						window.setTimeout(function(i) 
						{
							value.html(i+symbol);
						},interval*i,i);
					}
					
					if($option.type==='percentage')
					{
						var portion=(limit/maxValue);
						barInner.animate({width:(portion*100)+'%'},{duration:duration});
					}					
				},
				{
					offset		:	'90%',
					triggerOnce	:	true
				});	
			});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateCounter=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateCounter(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/