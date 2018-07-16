<?php

/******************************************************************************/
/******************************************************************************/

class ContactForm
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
		require_once('../../library/EmailTemplate.class.php');
		require_once('../../library/PHPMailer/class.phpmailer.php');		
	}
	
	/**************************************************************************/
	
	function send()
	{
		$response=array('error'=>0,'info'=>null);

		$data=array
		(
			'contact-form-name'													=> $_POST['contact-form-name'],
			'contact-form-email'												=> $_POST['contact-form-email'],
			'contact-form-phone'												=> $_POST['contact-form-phone'],
			'contact-form-message'												=> $_POST['contact-form-message']
		);

		if(isEmpty($data['contact-form-name']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'contact-form-name','message'=>CONTACT_FORM_MSG_INVALID_DATA_NAME);
		}

		if(!validateEmail($data['contact-form-email']))
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'contact-form-email','message'=>CONTACT_FORM_MSG_INVALID_DATA_EMAIL);
		}

		if(isEmpty($data['contact-form-message']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'contact-form-message','message'=>CONTACT_FORM_MSG_INVALID_DATA_MESSAGE);
		}	

		if($response['error']==1) createResponse($response);

		/**********************************************************************/
		
		if(isGPC()) $data=array_map('stripslashes',$data);

		/**********************************************************************/
		
		$EmailTemplate=new EmailTemplate();
		
		$EmailTemplate->addHeader('Details');
		
		$EmailTemplate->addLine('Name',$data['contact-form-name']);
		$EmailTemplate->addLine('Phone number',$data['contact-form-phone']);
		$EmailTemplate->addLine('E-mail address',$data['contact-form-email']);
		$EmailTemplate->addLine('Message',$data['contact-form-message']);

		/**********************************************************************/
		
		$mail=new PHPMailer();

		$mail->CharSet='UTF-8';

		$mail->SetFrom(CONTACT_FORM_EMAIL,CONTACT_FORM_NAME); 
		$mail->AddReplyTo($data['contact-form-email'],$data['contact-form-name']); 
		$mail->AddAddress(CONTACT_FORM_EMAIL,CONTACT_FORM_NAME);

		$smtp=CONTACT_FORM_SMTP_HOST;
		if(!empty($smtp))
		{
			$mail->IsSMTP();
			$mail->SMTPAuth=true; 
			$mail->Port=CONTACT_FORM_SMTP_PORT;
			$mail->Host=CONTACT_FORM_SMTP_HOST;
			$mail->Username=CONTACT_FORM_SMTP_USER;
			$mail->Password=CONTACT_FORM_SMTP_PASSWORD;
			$mail->SMTPSecure=CONTACT_FORM_SMTP_SECURE;
		}

		$mail->Subject=CONTACT_FORM_SUBJECT;
		$mail->MsgHTML($EmailTemplate->getEmail());

		if(!$mail->Send())
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'contact-form-submit','message'=>CONTACT_FORM_MSG_SEND_ERROR);
			createResponse($response);		
		}

		$response['error']=0;
		$response['info'][]=array('fieldId'=>'contact-form-submit','message'=>CONTACT_FORM_MSG_SEND_OK);

		createResponse($response);		
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/