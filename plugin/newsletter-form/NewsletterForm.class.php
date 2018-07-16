<?php

/******************************************************************************/
/******************************************************************************/

class NewsletterForm
{
	/**************************************************************************/

	function __construct()
	{
		$this->includeLibrary();
	}
	
	/**************************************************************************/
	
	function includeLibrary()
	{
		require_once('config.php');
		require_once('../../library/functions.php');
		require_once('../../library/Mailchimp/Mailchimp.php');	
	}
	
	/**************************************************************************/
	
	function send()
	{
		$response=array('error'=>0,'info'=>null);

		$values=array
		(
			'newsletter-form-email'												=>	$_POST['newsletter-form-email']
		);

		/**********************************************************************/

		if(!validateEmail($values['newsletter-form-email']))
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'newsletter-form-email','message'=>NEWSLETTER_FORM_MSG_INVALID_DATA_EMAIL);
		}

		if($response['error']==1) createResponse($response);

		/**********************************************************************/

		if(isGPC()) $values=array_map('stripslashes',$values);

		$MailChimp=new Mailchimp(NEWSLETTER_FORM_API_KEY);

		try
		{
			$MailChimp->lists->subscribe(NEWSLETTER_FORM_LIST_ID,array('email'=>$values['newsletter-form-email']),array(),false,true,false,false);
		}
		catch(Exception $e)
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'newsletter-form-submit','message'=>NEWSLETTER_FORM_MSG_SEND_ERROR);
			createResponse($response);		
		}

		$response['error']=0;
		$response['info'][]=array('fieldId'=>'newsletter-form-submit','message'=>NEWSLETTER_FORM_MSG_SEND_OK);

		createResponse($response);			
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/