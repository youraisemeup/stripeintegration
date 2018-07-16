<?php

/******************************************************************************/
/******************************************************************************/

class EmailTemplate
{
	/**************************************************************************/

	function __construct()
	{
		$this->html=null;
		
		$this->style=array
		(
			'base'																=>	array
			(
				'color'															=>	'#777777',
				'font-size'														=>	'15px',
				'font-family'													=>	'Arial',
				'line-height'													=>	'120%'
			),
			'separator'															=>	array
			(
				'1'																=>	array
				(
					'height'													=>	'45px'
				),
				'2'																=>	array
				(
					'height'													=>	'30px'
				),
				'3'																=>	array
				(
					'height'													=>	'15px'
				)
			),
			'cell'																=>	array
			(
				'1'																=>	array
				(
					'width'														=>	'200px;vertical-align:middle;'
				),
				'2'																=>	array
				(
					'width'														=>	'400px;text-align:right'
				)
			),
			'header'															=>	array
			(
				'color'															=>	'#444444',
				'font-weight'													=>	'bold',
				'border-style'													=>	'dotted',
				'border-width'													=>	'0px 0px 1px 0px',
				'border-color'													=>	'#AAAAA',
				'padding-bottom'												=>	'5px',
				'text-transform'												=>	'uppercase'
			),
			'table'																=>	array
			(
				1																=>	array
				(
					'width'														=>	'100%',
					'background-color'											=>	'#EEEEEE'
				),
				2																=>	array
				(
					'width'														=>	'600px',
					'padding'													=>	'50px',
					'border-width'												=>	'1px',
					'border-style'												=>	'solid',	
					'border-color'												=>	'#E1E8ED',
					'background-color'											=>	'#FFFFFF'
				)
			)
		);
				
	}
	
	/**************************************************************************/
	
	function getHeader()
	{
		$html=
		'
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">

				<head>

				</head>

				<body>
				
					<table cellspacing="0" cellpadding="0"'.$this->getStyle(array('base'=>false,'table'=>1)).'">
					
						<tr height="50px"><td></td></tr>
					
						<tr>
						
							<td>
							
								<table cellspacing="0" cellpadding="0" align="center" border="0"'.$this->getStyle(array('table'=>2)).'">
		';
		
		return($html);
	}
	
	/**************************************************************************/
	
	function getFooter()
	{
		$html=
		'
								</table>

							</td>

						</tr>

						<tr height="50px"><td></td></tr>

					</table> 

				</body>

			</html>		
		';
		
		return($html);
	}
	
	/**************************************************************************/
	
	function addHeader($header,$separator=false)
	{
		if($separator)
			$this->html.='<tr><td'.$this->getStyle(array('separator'=>2)).'><td></tr>';
		
		$this->html.=
		'
			<tr>
				<td'.$this->getStyle(array('header'=>false)).'>'.htmlspecialchars($header).'</td>
			</tr>
		';
	}
	
	/**************************************************************************/
	
	function addLine($name,$value)
	{
		$this->html.=
		'
			<tr><td'.$this->getStyle(array('separator'=>3)).'><td></tr>
			<tr>
				<td>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td'.$this->getStyle(array('cell'=>1)).'>'.htmlspecialchars($name).'</td>
							<td'.$this->getStyle(array('cell'=>2)).'>'.nl2br(htmlspecialchars($value)).'</td>
						</tr>
					</table>
				</td>
			</tr>
		';
	}
	
	
	/**************************************************************************/
	
	function getEmail()
	{
		return($this->getHeader().$this->html.$this->getFooter());
	}
	
	/**************************************************************************/
	
	function getStyle($style)
	{
		$inline=null;
		
		foreach($style as $styleName=>$styleIndex)
		{
			$array=$this->style[$styleName];

			if($styleIndex!==false) 
				$array=$this->style[$styleName][$styleIndex];
			
			foreach($array as $styleName=>$styleValue)
				$inline.=$styleName.':'.$styleValue.';';
		}
		
		return(' style="'.$inline.'"');
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/