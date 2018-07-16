/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateHeader=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $self=this;

		var $menuDefault=$('.template-component-menu-default>ul');
		var $menuResponsive=$('.template-component-menu-responsive');

		$this.headerSticky=undefined;

		/**********************************************************************/

		this.build=function() 
		{
			$menuDefault.superfish(
			{ 
				delay			:	0, 
				animation		:	{opacity:'show'}, 
				speed			:	200, 
				speedOut		:	0,	
				cssArrows		:	false
			}); 
			
			$menuDefault.find('ul a').prepend('<span class="template-icon-meta-arrow-right-12"></span>');
			
			$menuDefault.find('.template-state-selected').parents('ul').prev('a').addClass('template-state-selected');
			
			$menuDefault.find('a[href="#"]').on('click',function(e) 
			{
				e.preventDefault();
			});
			
			$menuResponsive.find('.template-state-selected').parents('ul').prev('a').addClass('template-state-selected');
			
			$menuResponsive.appendTo('body');
			
			$menuResponsive.find('a[href="#"]').each(function()
			{
				$(this).on('click',function(e)
				{
					var button=$(this).siblings('.touch-button');
					if(button.length===1)
					{
						e.preventDefault();
						button.trigger('click');
					}
				});
			});
			
			$menuResponsive.flexNav(
			{
				transitionOpacity	:	false,
				animationSpeed		:	200
			});
			
			$self.closeMenuResponsive(0);
			
			$menuResponsive.find('.template-component-menu-button-close').on('click',function(e)
			{
				e.preventDefault();
				$self.closeMenuResponsive();
			});

			$menuResponsive.find('.touch-button').addClass('template-icon-meta-arrow-large-tb');

			$this.find('.template-icon-meta-menu').on('click',function(e)
			{
				e.preventDefault();
				
				if(!$menuResponsive.hasClass('template-state-open'))
				{
					$self.openMenuResponsive();
				} 
				else $self.closeMenuResponsive();
			});
			
			$self.createStickyHeader();
			
			$(window).resize(function() 
			{
				$self.createStickyHeader();
                
                if($menuResponsive.hasClass('template-state-open'))
                    $menuResponsive.animate({top:0});
                else
                {
                    var height=parseInt($menuResponsive.actual('height'),10);
                    $menuResponsive.animate({top:-1*height});
                }
			});
		};
		
		/**********************************************************************/
		
		this.createStickyHeader=function()
		{
			if($this.hasClass('template-header-top-static')) return;

			var width=$('body').actual('width');
			if(width<768)
			{
				if(typeof($this.headerSticky)!=='undefined')
				{
					$this.headerSticky.destroy();
					$this.headerSticky=undefined;
					$this.removeClass('template-header-top-sticky');
				}

				return;
			}
			else
			{
				if(typeof($this.headerSticky)!=='undefined') return;
			}

			$this.headerSticky=new Waypoint.Sticky(
			{
				offset		:	-25,
				element		:	$this,
				wrapper		:	false,
				stuckClass	:	'',
				handler		:	function(direction)
				{
					if(direction==='down')
					{
						$this.animate({opacity:0},{duration:100,complete:function()
						{
							$this.addClass('template-header-top-sticky').animate({opacity:1},{duration:200});
						}});
					}
					else
					{
						$this.animate({opacity:0},{duration:100,complete:function()
						{
							$this.removeClass('template-header-top-sticky').animate({opacity:1},{duration:100});
						}});						
					}
				}
			});
		};
		
		/**********************************************************************/
		
		this.openMenuResponsive=function()
		{
			$menuResponsive.animate({top:0},{duration:500,easing:'easeInOutCubic',complete:function()
			{
				$menuResponsive.css({'height':'100%'});
				$menuResponsive.addClass('template-state-open');
			}});			
		};
		
		/**********************************************************************/
		
		this.closeMenuResponsive=function(duration)
		{
			$menuResponsive.css({'height':'auto'});
			var height=parseInt($menuResponsive.actual('outerHeight'),10);

			$menuResponsive.animate({top:-1*height},{duration:(typeof(duration)==='undefined' ? 500 : duration),easing:'easeInOutCubic',complete:function()
			{
				$('body').css({'overflow':'auto'});
				$menuResponsive.removeClass('template-state-open');
			}});
		};
		
		/**********************************************************************/
	};
	
	/**************************************************************************/
	
	$.fn.templateHeader=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateHeader(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);