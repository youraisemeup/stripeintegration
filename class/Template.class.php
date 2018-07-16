<?php

/******************************************************************************/
/******************************************************************************/

class Template
{
	/**************************************************************************/

	function __construct()
	{

	}
	
	/**************************************************************************/
	
	static function getFilePath($folder,$file)
	{
		$path=self::getTemplatePath($folder).basename($file).'.php';
		if((is_file($path)) && (file_exists($path))) return($path);
		return(false);
	}
	
	/**************************************************************************/
	
	static function getTemplatePath($folder=null)
	{
		return(dirname(__FILE__).'/../'.(is_null($folder) ? null : $folder.'/'));
	}
	
	/**************************************************************************/
	
	static function getCurrentFilePath($page=null)
	{
		if((is_null($page)) && (isset($_GET['page']))) $page=$_GET['page'];
		if((is_null($page))) $page='home';
		
		$path=self::getFilePath('page',$page);	
		
		if($path!==false) return($path);
		else return(self::getFilePath('page','404'));		
	}

	/**************************************************************************/

	static function includePage($page=null)
	{
		require_once(self::getCurrentFilePath($page));
	}
	
	/**************************************************************************/
	
	static function includeFooter()
	{
		self::includeFile('footer');
	}
	
	/**************************************************************************/
	
	static function includeHeader()
	{
		self::includeFile('header');
	}
	
	/**************************************************************************/
	
	static function includeFile($file)
	{
		$path=self::getFilePath('include',$file);
		if($path!==false) require_once($path);		
	}
	
	/**************************************************************************/
	
	static function includeTemplateHeaderTop()
	{
		$html=
		'
					<!-- Top header -->
					<div class="template-header-top'.(self::isPage('404') ? ' template-header-top-static' : null).'">

						<!-- Logo -->
						<div class="template-header-top-logo">
							<a href="'.Template::getPageURL('home',false).'" title="">
								<img src="media/image/logo.png" alt="" class="template-logo"/>
								<img src="media/image/logo_sticky.png" alt="" class="template-logo template-logo-sticky"/>
							</a>
						</div>

						<!-- Menu-->
						<div class="template-header-top-menu template-main">
							<nav>
							
								<!-- Default menu-->
								<div class="template-component-menu-default">
									<ul class="sf-menu">
										'.self::createMenuItem('home','Home').'								
										'.self::createMenuItem('about','About us').'
										'.self::createMenuItem('gallery','Gallery').'
										'.self::createMenuItem('book-your-wash','Booking').'
										'.self::createMenuItem('contact','Contact us').'
										<li><a href="../"> Francais</a></li>
										
									</ul>
								</div>
								
							</nav>
							<nav>
							
								<!-- Mobile menu-->
								<div class="template-component-menu-responsive">
									<ul class="flexnav">
										<li><a href="#"><span class="touch-button template-icon-meta-arrow-large-tb template-component-menu-button-close"></span>&nbsp;</a></li>
										'.self::createMenuItem('home','Home').'								
										'.self::createMenuItem('about','About us').'
										'.self::createMenuItem('gallery','Gallery').'
										'.self::createMenuItem('book-your-wash','Booking').'
										'.self::createMenuItem('contact','Contact us').'
										<li><a href="../"> Francais</a></li>
																			</ul>							
								</div>
								
							</nav>
							<script type="text/javascript">
								jQuery(document).ready(function($)
								{
									$(\'.template-header-top\').templateHeader();
								});
							</script>
						</div>

						<!-- Social icons -->
						<div class="template-header-top-icon-list template-component-social-icon-list-1">
							<ul class="template-component-social-icon-list">
								<li><a href="https://www.facebook.com/autocomete" class="template-icon-social-facebook" target="_blank"></a></li>
								<li><a href="https://www.instagram.com/autocomete/" class="template-icon-social-instagram" target="_blank"></a></li>
								<li><a href="'.Template::getPageURL('book-your-wash',false).'" class="template-icon-meta-cart"></a></li>
								<li><a href="#" class="template-icon-meta-menu"></a></li>
							</ul>
						</div>

					</div>				
		';
		
		echo $html;
	}
	
	/**************************************************************************/
	
	static function includeTemplateHeaderBottom($title,$breadcrumb)
	{
		$breadcrumbHTML=null;
		
		foreach($breadcrumb as $breadcrumbData)
		{
			if(!is_null($breadcrumbHTML)) $breadcrumbHTML.='<span class="template-icon-meta-arrow-right-12"></span>';
			$breadcrumbHTML.='<a href="'.$breadcrumbData[0].'">'.$breadcrumbData[1].'</a>';
		}
		
		$html=
		'
					<div class="template-header-bottom">
					
						<div class="template-main">

							<div class="template-header-bottom-page-title">
								<h1>'.htmlspecialchars($title).'</h1>
							</div>

							<div class="template-header-bottom-page-breadcrumb">
								'.$breadcrumbHTML.'
							</div>
						
						</div>

					</div>
		';
		
		echo $html;
	}
	
	/**************************************************************************/
	
	static function getBodyCSSClass()
	{
		$class=array('template-page-'.basename(self::getCurrentFilePath(),'.php'));
		return(join(' ',$class));
	}
	
	/**************************************************************************/
	
	static function getPageURL($page,$echo=true)
	{
		$url=$page==='#' ? '#' : '?page='.$page;
		
		if($echo) echo $url;
		else return($url);
	}
	
	/**************************************************************************/
	
	static function isPage($page)
	{
		return(basename(self::getCurrentFilePath(),'.php')==$page);
	}
	
	/**************************************************************************/
	
	static function createMenuItem($page,$label,$listItem=true)
	{	
		$html='<a href="'.self::getPageURL($page,false).'"'.(self::isPage($page) ? ' class="template-state-selected"' : null).'>'.$label.'</a>';
		if($listItem) $html='<li>'.$html.'</li>';
		return($html);
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/