/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateGallery=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			var i=0;
			var component=$this.find('.template-component-image');
			var componentLength=component.length;
			
			component.each(function() 
			{
				var image=$(this).find('img');
				image.one('load',function()
				{
					if((++i)===componentLength)
					{
						$self.createIsotope('');

						var filterList=$this.children('.template-component-gallery-filter-list');
						if(filterList.length===1)
						{
							filterList.find('li a').on('click',function(e)
							{
								e.preventDefault();
								$self.setSelected(this);
								$self.createIsotope($self.getFilter(this));
							});
						}		
					}
				}).each(function() 
				{
					if(this.complete) $(this).load();
				});
			});
		};
		
		/**********************************************************************/
		
		this.setSelected=function(object)
		{
			$this.find('.template-component-gallery-filter-list>li a').removeClass('template-state-selected');
			$(object).addClass('template-state-selected');
		};
		
		/**********************************************************************/
		
		this.getFilter=function(object)
		{
			var filter='';
			var className=$(object).attr('class').split(' ');
			
			for(var i in className)
			{
				if(className[i].indexOf('template-filter-all')!==-1) return('');
				if(className[i].indexOf('template-filter-')!==-1) filter+=' .'+className[i];					
			}
			
			return(filter);
		};
		
		/**********************************************************************/
		
		this.createIsotope=function(filter,bind)
		{
			var glutter=60;
			var columnWidth=350;
			
			var imageList=$this.children('.template-component-gallery-image-list');
			var imageListWidth=imageList.actual('width');
			
			if(typeof(bind)==='undefined') bind=true;
			
			if(imageListWidth<=300) 
			{
				glutter=0;
				columnWidth=300;
			}
			else if(imageListWidth<=460) columnWidth=200;
			else if(imageListWidth<=750) columnWidth=345;
			else if(imageListWidth<=940) columnWidth=273;
			
			imageList.children('li').css('max-width',columnWidth);
			imageList.children('li.template-component-gallery-image-list-width-2').css('max-width',(columnWidth*2)+glutter);
	
			var itemReveal=Isotope.Item.prototype.reveal;
			Isotope.Item.prototype.reveal=function()
			{
				itemReveal.apply(this,arguments);

				var link=$(this.element).find('a');
				link.attr('data-fancybox-group',link.attr('data-fancybox-group-temp')).removeAttr('data-fancybox-group-temp');
			};

			var itemHide=Isotope.Item.prototype.hide;
			Isotope.Item.prototype.hide=function() 
			{
				itemHide.apply(this,arguments);
				var link=$(this.element).find('a');
				link.attr('data-fancybox-group-temp',link.attr('data-fancybox-group')).removeAttr('data-fancybox-group');
			};

			imageList.isotope(
			{
				filter				:	filter,
				masonry: 
				{
					gutter			:	glutter,
					columnWidth		:	columnWidth
				}
			});	
			
			if(bind)
			{
				$(window).resize(function()
				{
					$self.createIsotope(filter,false);
				});
			}
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateGallery=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateGallery(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/