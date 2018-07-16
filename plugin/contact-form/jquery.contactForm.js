/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var contactForm=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.on('submit',function(e) 
			{
				e.preventDefault();
				$self.submit();
			});
		};
		
		/**********************************************************************/
		
		this.submit=function()
		{
			this.blockForm(true);
			$.post('plugin/contact-form/contact-form.php',$this.serialize(),this.processResponse,'json');			
		};
		
		/**********************************************************************/
		
		this.processResponse=function(response)
		{
			$self.blockForm(false);
			$this.find('.template-component-form-field').qtip('destroy');

			var error=false;

			if(typeof(response.info)!=='undefined')
			{	
				if(response.info.length)
				{	
					for(var key in response.info)
					{
						error=error || response.error;

						$('#'+response.info[key].fieldId).parent().qtip(
						{
							show		:	
							{ 
								target	:	$(this) 
							},
							style		:	
							{ 
								classes	:	(response.error===1 ? 'template-qtip template-qtip-error' : 'template-qtip template-qtip-success')
							},
							content		: 	
							{ 
								text	:	response.info[key].message 
							},
							position	: 	
							{ 
								my		:	'bottom center',
								at		:	'top center' 
							}
						}).qtip('show');	
					}
				}
			}

			if(!error) 
			{
				$this.find('input[type="text"],textarea').val('').blur();
				window.setTimeout(function() 
				{ 
					$('#contact-form-submit').qtip('destroy'); 
				},2000);
			}			
		};
		
		/**********************************************************************/
		
		this.blockForm=function(block)
		{
			if(block) $this.find('.template-state-block').block({message:false,overlayCSS:{opacity:'0.3'}});
			else $this.find('.template-state-block').unblock();			
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.contactForm=function(option) 
	{
		return this.each(function() 
		{
			var object=new contactForm(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/