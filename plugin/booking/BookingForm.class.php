<?php

/******************************************************************************/
/******************************************************************************/

class BookingForm
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
			'booking-form-first-name'											=>	$_POST['booking-form-first-name'],
			'booking-form-second-name'											=>	$_POST['booking-form-second-name'],
			'booking-form-email'												=>	$_POST['booking-form-email'],
			'booking-form-phone'												=>	$_POST['booking-form-phone'],
			'booking-form-vehicle-make'											=>	$_POST['booking-form-vehicle-make'],
			'booking-form-vehicle-model'										=>	$_POST['booking-form-vehicle-model'],
			'booking-form-date'													=>	$_POST['booking-form-date'],
			'booking-form-time'													=>	'',
			'booking-form-message'												=>	$_POST['booking-form-message']
		);

		$dateTime=explode(' ',$data['booking-form-date']);

		if(isset($dateTime[0])) $data['booking-form-date']=$dateTime[0];
		if(isset($dateTime[1])) $data['booking-form-time']=$dateTime[1];
		
		$bookingData=json_decode(isGPC() ? stripslashes($_POST['booking-form-data']) : $_POST['booking-form-data']);

		/******************************************************************************/

		if(isEmpty($data['booking-form-first-name']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-first-name','message'=>BOOKING_FORM_MSG_INVALID_DATA_FIRST_NAME);
		}

		if(isEmpty($data['booking-form-second-name']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-second-name','message'=>BOOKING_FORM_MSG_INVALID_DATA_SECOND_NAME);
		}

		if(!validateEmail($data['booking-form-email']))
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'booking-form-email','message'=>BOOKING_FORM_MSG_INVALID_DATA_EMAIL);
		}

		if(isEmpty($data['booking-form-phone']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-phone','message'=>BOOKING_FORM_MSG_INVALID_DATA_PHONE);
		}

		if(!validateDate($data['booking-form-date']))
		{			
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-date','message'=>BOOKING_FORM_MSG_INVALID_DATA_DATE);
		}

		if(!validateTime($data['booking-form-time']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-date','message'=>BOOKING_FORM_MSG_INVALID_DATA_DATE);
		}

		if(isEmpty($data['booking-form-message']))
		{
			$response['error']=1;
			$response['info'][]=array('fieldId'=>'booking-form-message','message'=>BOOKING_FORM_MSG_INVALID_DATA_MESSAGE);
		}	

		if($response['error']==1) createResponse($response);

		/**********************************************************************/

		if(isGPC()) $data=array_map('stripslashes',$data);

		$EmailTemplate=new EmailTemplate();
		
		$EmailTemplate->addHeader('Client');
		
		$EmailTemplate->addLine('First name',$data['booking-form-first-name']);
		$EmailTemplate->addLine('Second name',$data['booking-form-second-name']);
		$EmailTemplate->addLine('E-mail address',$data['booking-form-email']);
		$EmailTemplate->addLine('Phone number',$data['booking-form-phone']);
		$EmailTemplate->addLine('Vehicle make',$data['booking-form-vehicle-make']);
		$EmailTemplate->addLine('Vehicle model',$data['booking-form-vehicle-model']);
		$EmailTemplate->addLine('Booking date',$data['booking-form-date'].' '.$data['booking-form-time']);
		$EmailTemplate->addLine('Message',$data['booking-form-message']);

		if(isset($bookingData->{'vehicle'}))
		{
			$EmailTemplate->addHeader('Vehicle',true);
			$EmailTemplate->addLine('Vehicle name',$bookingData->{'vehicle'}->{'name'});
		}
		
		if(isset($bookingData->{'package'}))
		{
			$EmailTemplate->addHeader('Package',true);
			$EmailTemplate->addLine('Name',$bookingData->{'package'}->{'name'});
			$EmailTemplate->addLine('Price',$bookingData->{'package'}->{'price'}.' ['.$bookingData->{'package'}->{'currency'}.']');
			$EmailTemplate->addLine('Duration',$bookingData->{'package'}->{'duration'}.' [min]');
		}		
		
		if(count($bookingData->{'package'}->{'service'}))
		{
			$EmailTemplate->addHeader('Services from package',true);
			foreach($bookingData->{'package'}->{'service'} as $serviceData)
				$EmailTemplate->addLine($serviceData->{'name'},'-');			
		}
		
		if(count($bookingData->{'service'}))
		{
			$EmailTemplate->addHeader('Services',true);
			
			foreach($bookingData->{'service'} as $serviceData)
				$EmailTemplate->addLine($serviceData->{'name'},$serviceData->{'price'}.' ['.$serviceData->{'currency'}.'], '.$serviceData->{'duration'}.' [min]');
		}
		
		$EmailTemplate->addHeader('Summary',true);
		$EmailTemplate->addLine('Price',$bookingData->{'cost'}->{'price'}->{'value'}.' ['.$bookingData->{'cost'}->{'price'}->{'currency'}.']');
		$EmailTemplate->addLine('Duration',$bookingData->{'cost'}->{'duration'}->{'hour'}.' [h] '.$bookingData->{'cost'}->{'duration'}->{'minute'}.' [min]');
		
		/**********************************************************************/
		
		$mail=new PHPMailer();

		$mail->CharSet='UTF-8';

		$mail->SetFrom(BOOKING_FORM_EMAIL,BOOKING_FORM_NAME); 
		$mail->AddReplyTo($data['booking-form-email'],$data['booking-form-first-name'].' '.$data['booking-form-second-name']); 
		$mail->AddAddress(BOOKING_FORM_EMAIL,BOOKING_FORM_NAME);

		$smtp=BOOKING_FORM_SMTP_HOST;
		if(!empty($smtp))
		{
			$mail->IsSMTP();
			$mail->SMTPAuth=true; 
			$mail->Port=BOOKING_FORM_SMTP_PORT;
			$mail->Host=BOOKING_FORM_SMTP_HOST;
			$mail->Username=BOOKING_FORM_SMTP_USER;
			$mail->Password=BOOKING_FORM_SMTP_PASSWORD;
			$mail->SMTPSecure=BOOKING_FORM_SMTP_SECURE;
		}

		$mail->Subject=BOOKING_FORM_SUBJECT;
		$mail->MsgHTML($EmailTemplate->getEmail());

		if(!$mail->Send())
		{
			$response['error']=1;	
			$response['info'][]=array('fieldId'=>'booking-form-submit','message'=>BOOKING_FORM_MSG_SEND_ERROR);
			createResponse($response);		
		}

		$response['error']=0;
		$response['info'][]=array('fieldId'=>'booking-form-submit','message'=>BOOKING_FORM_MSG_SEND_OK);

		createResponse($response);		
	}
	
	/**************************************************************************/
}

/******************************************************************************/
/******************************************************************************/