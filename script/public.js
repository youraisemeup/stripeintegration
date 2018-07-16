"use strict";
/******************************************************************************/
/******************************************************************************/

jQuery(document).ready(function($) 
{	
	/**************************************************************************/
	
	$('.template-component-accordion').templateAccordion(
	{
		active			:	0,
		header			:	'h6',
		disabled		:	false,
		collapsible		:	false,
		heightStyle		:	'content',
		animate			:
		{
			easing		:	'easeOutQuad',
			duration	:	300
		}
	});
	
	/**************************************************************************/
	
	$('.template-component-tab').templateTab(
	{
		active			:	0,
		disabled		:	false,
		collapsible		:	false,
		heightStyle		:	'content',
		show			:
		{
			delay		:	0,
			easing		:	'swing',
			duration	:	200
		},
		hide			:
		{
			delay		:	0,
			easing		:	'swing',
			duration	:	100		
		}
	});
	
	/**************************************************************************/
	
	$('.template-component-counter-bar-list').templateCounter(
	{
		type			:	'percentage'
	});
	
	/**************************************************************************/
	
	$('.template-component-counter-box-list').templateCounter(
	{
		type			:	'other'
	});
	
	/**************************************************************************/
	
	$('.template-header .template-icon-meta-search').templateSearchForm({searchForm:'body>.template-component-search-form'});
	
	/**************************************************************************/
	
	$('.template-component-testimonial-list').templateTestimonial();
	
	/**************************************************************************/
	
	$('.template-component-contact-form').contactForm();
	
	/**************************************************************************/
	
	$('.template-component-newsletter-form').newsletterForm();
	
	/**************************************************************************/
	
	$('.template-component-gallery').templateGallery();
	
	/**************************************************************************/
	
	$('.template-fancybox').templateFancybox();
	
	/**************************************************************************/
	
	$('.template-component-more-link').templateMoreLess();
	
	/**************************************************************************/
	
	$('.template-component-image').templateImage();
	
	/**************************************************************************/
	
	$('.template-component-go-to-top').templateGoToTop();
	
	/**************************************************************************/
	
	$('.template-layout-50x50').responsiveElement({className:'template-responsive-column-a'});
	$('.template-layout-33x33x33').responsiveElement({className:'template-responsive-column-a'});
	$('.template-layout-25x25x25x25:not(.template-component-counter-box-list>.template-layout-25x25x25x25)').responsiveElement({width:750,className:'template-responsive-column-a'});
	$('.template-layout-66x33').responsiveElement({className:'template-responsive-column-a'});
	$('.template-layout-33x66').responsiveElement({className:'template-responsive-column-a'});
	
	$('.template-component-counter-box-list>.template-layout-25x25x25x25').responsiveElement({width:940,className:'template-responsive-column-a'});

	/**************************************************************************/
});

/******************************************************************************/
/******************************************************************************/