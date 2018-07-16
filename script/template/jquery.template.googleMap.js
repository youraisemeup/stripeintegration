/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateGoogleMap=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{
			marker							:	'',
			dimension						:
			{
				width						:	'100%',
				height						:	'300px'			
			},
			coordinate						:
			{
				lat							:	'',
				lng							:	''
			},
			map								:
			{	
				draggable					:	true,
				scrollwheel					:	false,
				mapTypeId					:	google.maps.MapTypeId['ROADMAP'],
				mapTypeControl				:	true,
				mapTypeControlOptions		:	
				{
					style					:	google.maps.MapTypeControlStyle['DEFAULT'],
					position				:	google.maps.ControlPosition['TOP_CENTER'],
				},
				zoom						:	16,
				zoomControl					:	true,
				zoomControloptions			:	
				{
					style					:	google.maps.ZoomControlStyle['SMALL'],
					position				:	google.maps.ControlPosition['RIGHT_TOP']
				},
				panControl					:	false,
				panControlOptions			:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']			
				},
				scaleControl				:	false,
				scaleControlOptions			:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']
				},
				streetViewControl			:	false,
				streetViewControlOptions	:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']
				}
			},
			styles							: 
			[
				{ 
					elementType				:	'geometry', 
					stylers					: 
					[ 
						{ 
							color			:	'#F5F5F5' 
						} 
					] 
				},
				{ 
					featureType				:	'transit', 
					stylers					: 
					[ 
						{ 
							'visibility'	:	'off' 
						}
					] 
				},
				{ 
					featureType				:	'water', 
					elementType				:	'labels', 
					stylers					: 
					[ 
						{ 
							'visibility'	:	'off' 
						}
					] 
				},
				{ 
					featureType				:	'water', 
					elementType				:	'geometry', 
					stylers: 
					[ 
						{ 
							color			:	'#AEDCF3' 
						}
					] 
				},
				{ 
					featureType				:	'road', 
					elementType				:	'geometry.stroke', 
					stylers: 
					[ 
						{
							color			:	'#E2E7E7' 
						}
					] 
				},
				{	
					featureType				:	'road', 
					elementType				:	'geometry.fill', 
					stylers: 
					[ 
						{ 
							color			:	'#E2E7E7' 
						}
					] 
				},
				{ 
					featureType				:	'landscape', 
					elementType				:	'geometry', 
					stylers: 
					[ 
						{ 
							color			:	'#FFFFFF' 
						} 
					] 
				},
				{ 
					elementType				:	'labels.text.fill', 
					stylers: 
					[ 
						{ 
							color			:	'#777777' 
						}
					] 
				},
				{ 
					featureType				:	'road', 
					elementType				:	'labels.text.fill', 
					stylers					: 
					[ 
						{ 
							color			:	'#444444' 
						} 
					] 
				} 
			
			]
		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.build=function() 
		{
			/***/
			
			var helper=$().templateHelper();
			
			/***/
			
			var mapBox=$this.children('.template-component-google-map-box');
			
			var mapBoxContent=$this.find('.template-component-google-map-box-content');
			var mapBoxContentId=helper.getRandomId('template-component-google-map-box-content-');
			
			mapBoxContent.attr('id',mapBoxContentId);
			mapBoxContent.css({height:$option.dimension.height});
			
			/***/
			
			var mapButton=$this.children('.template-component-google-map-button');
			if(mapButton.length===1)
			{
				$this.css({'display':'block'});
				mapButton.on('click',function(e)
				{
					e.preventDefault();
					if(!$this.hasClass('template-state-open'))
					{
						mapBox.animate({'height':$option.dimension.height},{duration:500,complete:function()
						{
							$this.addClass('template-state-open');
						}});
					}
					else
					{
						mapBox.animate({'height':0},{duration:500,complete:function()
						{
							$this.removeClass('template-state-open');
						}});						
					}
				});
			}
			else
			{
				mapBox.css({height:$option.dimension.height});
				$this.css({'display':'block'});
			}
			
			/***/
	
			var coordinate=new google.maps.LatLng($option.coordinate.lat,$option.coordinate.lng);
			$option.map.center=coordinate;

			var googleMap=new google.maps.Map(document.getElementById(mapBoxContentId),$option.map);
			googleMap.setOptions({styles:$option.styles});
			
			if(parseInt($option.marker.length,10)!==0)
			{
				var markerOption=
				{
					map			:	googleMap,
					position	:	coordinate,
					icon		:	$option.marker
				};

				new google.maps.Marker(markerOption);

				jQuery(window).resize(function() 
				{
					var currCenter=googleMap.getCenter();
					google.maps.event.trigger(googleMap,'resize');
					googleMap.setCenter(currCenter);
				});
			}
			
			/***/
		};
	};
	
	/**************************************************************************/
	
	$.fn.templateGoogleMap=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateGoogleMap(this,option);
			object.build();
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);