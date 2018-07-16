/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var booking=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		var $option=option;
		
		var prevWidth=false;

		/**********************************************************************/

		this.build=function() 
		{
			$self.setWidthClass();
			
			/***/
			
			$self.vehicleSelect();
			$self.packageSet();
			$self.calculate();
			
			/***/
			
			$this.find('.template-component-booking-vehicle-list').on('click','li',function(e)
			{
				e.preventDefault();
				$self.vehicleSelect($(this));
				$self.packageSet();
				$self.calculate();
			});
			
			/***/
			
			$this.find('.template-component-booking-package-list>li>.template-component-button-box>a[href="#"]').on('click',function(e)
			{
				e.preventDefault();
				$self.packageSelect($(this).parents('li:first'));
				$self.serviceSet();
				$self.calculate();
			});			
			
			/***/
			
			$this.find('.template-component-booking-service-list>li>.template-component-button-box>a').on('click',function(e)
			{
				e.preventDefault();
				$self.serviceSelect($(this).parents('li:first'));
				$self.calculate();
			});	
			
			/***/
			
			$this.find('form').on('submit',function(e) 
			{
				e.preventDefault();
				$self.submit();
			});
			
			/***/
			
            $('#booking-form-date').on('focus',function(e) 
            {
                $(this).blur();
            });
			$("#dtBox").DateTimePicker(
			{
				dateTimeFormat		:	'dd-MM-yyyy hh:mm',
				animationDuration	:	500,
				minuteInterval		:	10,
				buttonsToDisplay	:	['SetButton','ClearButton']
			});
			
			/***/
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.vehicleSelect=function(object)
		{
			var vehicleList=$this.find('.template-component-booking-vehicle-list>li');
			
			if(typeof(object)===typeof(undefined)) object=vehicleList.first();
					
			object.siblings().removeClass('template-state-selected');
			object.addClass('template-state-selected');				
		};
		
		/**********************************************************************/
		
		this.vehicleGet=function()
		{
			var selected=$this.find('.template-component-booking-vehicle-list>li.template-state-selected');
			if(selected.length!==1) return(false);
			
			var id=$self.getAttributeValue(selected);
			if(id===false) return(false);
			
			return(id);
		};

		/**********************************************************************/
		/**********************************************************************/
		
		this.packageSelect=function(object)
		{
			var packageList=$this.find('.template-component-booking-package-list>li');
			
			if(typeof(object)===typeof(undefined)) object=packageList.first(':not[class="template-state-hidden"]');
			
			object.siblings().removeClass('template-state-selected');
			object.toggleClass('template-state-selected');			
		};
		
		/**********************************************************************/
		
		this.packageGet=function()
		{
			var selected=$this.find('.template-component-booking-package-list>li.template-state-selected');
			if(selected.length!==1) return(false);
			
			var id=$self.getAttributeValue(selected);
			if(id===false) return(false);
			
			return(id);
		};
		
		/**********************************************************************/
		
		this.packageSet=function()
		{
			var packageList=$this.find('.template-component-booking-package-list>li');
			packageList.removeClass('template-state-hidden template-state-selected');
			
			var vehicleId=$self.vehicleGet();
			if(vehicleId===false) return(false);
			
			packageList.each(function() 
			{
				var vehicleIdRelated=$self.getAttributeValue($(this),'data-id-vehicle-rel');
				
				if(vehicleIdRelated!==false)
				{
					if($.inArray(vehicleId[0],vehicleIdRelated)===-1)
						$(this).addClass('template-state-hidden');
				}
			});
			
			packageList.each(function()
			{
				if(!$(this).hasClass('template-state-hidden'))
				{
					if($(this).find('.template-component-button').attr('href')==='#')
					{
						$(this).addClass('template-state-selected');
						return(false);
					}
				}
			});
			
			$self.serviceSet();
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.serviceSelect=function(object)
		{
			object.toggleClass('template-state-selected');
		};
		
		/**********************************************************************/
		
		this.serviceSet=function()
		{
			var serviceList=$this.find('.template-component-booking-service-list>li');
			serviceList.removeClass('template-state-hidden template-state-selected');		
			
			var packageId=$self.packageGet();
			if(packageId!==false)			
			{
				$this.find('.template-component-booking-package-list>li[data-id="'+packageId[0]+'"]>.template-component-booking-package-service-list>li').each(function()
				{
					var packageServiceListId=$self.getAttributeValue($(this));
					if(packageServiceListId!==false)
					{
						serviceList.each(function()
						{
							var serviceId=$self.getAttributeValue($(this));
							if(packageServiceListId[0]===serviceId[0])
								$(this).addClass('template-state-hidden');
						});
					}
				});
	
				serviceList.each(function() 
				{
					var packageIdRelated=$self.getAttributeValue($(this),'data-id-package-rel');

					if(packageIdRelated!==false)
					{
						if($.inArray(packageId[0],packageIdRelated)===-1)
							$(this).addClass('template-state-hidden');
					}
				});
			}
			
			var vehicleId=$self.vehicleGet();
			if(vehicleId!==false)
			{
				serviceList.each(function() 
				{
					var vehicleIdRelated=$self.getAttributeValue($(this),'data-id-vehicle-rel');
					if(vehicleIdRelated!==false)
					{
						if($.inArray(vehicleId[0],vehicleIdRelated)===-1)
							$(this).addClass('template-state-hidden');
					}
				});
			}
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.calculate=function()
		{
			var cost=0.00;
			var duration=0;
			
			var packageSelected=$this.find('.template-component-booking-package-list>li.template-state-selected');
			if(packageSelected.length===1)
			{
				cost+=parseFloat(packageSelected.find('.template-component-booking-package-price-total').text())+parseFloat('0.'+packageSelected.find('.template-component-booking-package-price-decimal').text());
				duration+=parseInt(packageSelected.find('.template-component-booking-package-duration-value').text(),10);
			}
			
			var serviceSelected=$this.find('.template-component-booking-service-list>li.template-state-selected');
			serviceSelected.each(function() 
			{
				cost+=parseFloat($(this).find('.template-component-booking-service-price-value').text());
				duration+=parseInt($(this).find('.template-component-booking-service-duration-value').text(),10);
			});
			
			duration=$self.calculateDuration(parseInt(duration,10));
			
			$this.find('.template-component-booking-summary-price-value').text(parseFloat(cost).toFixed(2));
			
			$this.find('.template-component-booking-summary-duration>h5>span:eq(0)').text(duration[0]);
			$this.find('.template-component-booking-summary-duration>h5>span:eq(2)').text(duration[1]);
		};
		
		/**********************************************************************/
		
		this.calculateDuration=function(minute)
		{
			if(minute<60) return([0,minute]);
			return([Math.floor(minute/60),minute-(Math.floor(minute/60)*60)]);
		};
		
		/**********************************************************************/
		
		this.setData=function()
		{
			var data=
			{
				vehicle				:
				{
					name			:	''
				},
				package				:
				{
					name			:	'',
					price			:	'',
					currency		:	'',
					duration		:	'',
					service			:	[]
				},
				service				:	[],
				cost				:
				{
					duration		:
					{
						hour		:	0,
						minute		:	0
					},
					price			:	
					{
						value		:	0,
						currency	:	''
					}
				}
			};
			
			/***/
			
			var vehicleSelected=$this.find('.template-component-booking-vehicle-list>li.template-state-selected');
			data.vehicle.name=vehicleSelected.children('div').children('div:eq(1)').text();

			/***/
			
			var packageSelected=$this.find('.template-component-booking-package-list>li.template-state-selected');
			if(packageSelected.length===1)
			{
				data.package.name=packageSelected.find('.template-component-booking-package-name').text();
				data.package.price=packageSelected.find('.template-component-booking-package-price-total').text()+'.'+packageSelected.find('.template-component-booking-package-price-decimal').text();
				data.package.currency=packageSelected.find('.template-component-booking-package-price-currency').text();
				data.package.duration=packageSelected.find('.template-component-booking-package-duration-value').text();
				
				packageSelected.find('.template-component-booking-package-service-list>li').each(function()
				{
					data.package.service.push({name:$(this).text()});
				});
			}
			
			/***/
			
			var serviceSelected=$this.find('.template-component-booking-service-list>li.template-state-selected');
			serviceSelected.each(function() 
			{
				data.service.push(
				{
					name		:	$(this).find('.template-component-booking-service-name>span').text(),
					price		:	$(this).find('.template-component-booking-service-price-value').text(),
					currency	:	$(this).find('.template-component-booking-service-price-currency').text(),
					duration	:	$(this).find('.template-component-booking-service-duration-value').text()
				});
			});
			
			/***/
			
			data.cost.price.value=$this.find('.template-component-booking-summary-price-value').text();
			data.cost.price.currency=$this.find('.template-component-booking-summary-price-symbol').text();
			
			data.cost.duration.hour=$this.find('.template-component-booking-summary-duration>h5>span:eq(0)').text();
			data.cost.duration.minute=$this.find('.template-component-booking-summary-duration>h5>span:eq(2)').text();
			
			/***/	

			$this.find('#booking-form-data').val(JSON.stringify(data));
		};
		
		/**********************************************************************/
		
		this.submit=function()
		{
			$self.setData();
			$self.blockForm(true);
			$.post('plugin/booking/booking.php',$this.find('form').serialize(),this.processResponse,'json');				
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
				$self.vehicleSelect();
				$self.packageSet();				
				
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
			if(block) $this.block({message:false,overlayCSS:{opacity:'0.3'}});
			else $this.unblock();			
		};
		
		/**********************************************************************/
		
		this.setWidthClass=function()
		{
			var width=$this.parent().width();
			
			var className=null;
			var classPrefix='template-width-';
			
			if(width>=1170) className='1170';
			else if(width>=940) className='960';
			else if(width>=750) className='768';
			else if(width>=460) className='480';
			else if(width>=300) className='300';
			else if(width>=0) className='0';
			
			var oldClassName=$self.getValueFromClass($this,classPrefix);
			if(oldClassName!==false) $this.removeClass(classPrefix+oldClassName);
			
			$this.addClass(classPrefix+className);
			
			if($self.prevWidth!==width) $self.prevWidth=width;
			
			setTimeout($self.setWidthClass,500);
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.getAttributeValue=function(object,attributeName)
		{
			if(typeof(attributeName)===typeof(undefined)) attributeName='data-id';

			var attribute=$(object).attr(attributeName);

			if((typeof(attribute)!==typeof(undefined)) && (attribute!==false)) 
			{
				var r=attribute.indexOf(',')!==-1 ? attribute.split(',') : [attribute];
				return(r);
			}
			
			return(false);
		};
		
		/**********************************************************************/
		
		this.getValueFromClass=function(object,pattern)
		{
			try
			{
				var reg=new RegExp(pattern);
				var className=$(object).attr('class').split(' ');

				for(var i in className)
				{
					if(reg.test(className[i]))
						return(className[i].substring(pattern.length));
				}
			}
			catch(e) {}

			return(false);		
		};	
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.booking=function(option) 
	{
		return this.each(function() 
		{
			var object=new booking(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/