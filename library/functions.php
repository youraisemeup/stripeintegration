<?php

/******************************************************************************/
/******************************************************************************/

function formatValue($value)
{
	if(isGPC()) return(stripslashes($value));
	return($value);
}

/******************************************************************************/

function isGPC()
{
	return((bool)ini_get('magic_quotes_gpc'));
}

/******************************************************************************/

function isEmpty($value)
{
	return(!(bool)mb_strlen($value));
}

/******************************************************************************/

function createResponse($response)
{
	echo json_encode($response);
	exit;
}

/******************************************************************************/

function validateEmail($email)
{
	if(!preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i',$email,$result)) return(false);
	else return(true);
}

/******************************************************************************/

function validateTime($value,$empty=false)
{
	if(($empty) && ($this->isEmpty($value))) return(true);

	if(!preg_match('/^[01]?[0-9]|2[0-3]:[0-5][0-9]$/i',$value)) return(false);

	return(true);
}

/******************************************************************************/

function validateDate($value,$empty=false)
{
	if(($empty) && ($this->isEmpty($value))) return(true);

	$date=preg_split('/-/',$value);

	if(isset($date[0],$date[1],$date[2]))
		return(checkdate($date[1],$date[0],$date[2]));

	return(false);
}

/******************************************************************************/

function verifyEmail($toemail,$fromemail,$getdetails=false)
{
	$email_arr=explode("@",$toemail);
	$domain=array_slice($email_arr,-1);
	$domain=$domain[0];

	$domain=ltrim($domain,"[");
	$domain=rtrim($domain,"]");

	$details=null;
	
	if("IPv6:"==substr($domain,0,strlen("IPv6:")))
	{
		$domain=substr($domain,strlen("IPv6") +1);
	}

	$mxhosts=array();
	if( filter_var($domain,FILTER_VALIDATE_IP))
		$mx_ip=$domain;
	else
		getmxrr($domain,$mxhosts,$mxweight);

	if(!empty($mxhosts))
		$mx_ip=$mxhosts[array_search(min($mxweight),$mxhosts)];
	else 
	{
		if(filter_var($domain,FILTER_VALIDATE_IP,FILTER_FLAG_IPV4))
		{
			$record_a=dns_get_record($domain,DNS_A);
		}
		elseif( filter_var($domain,FILTER_VALIDATE_IP,FILTER_FLAG_IPV6))
		{
			$record_a=dns_get_record($domain,DNS_AAAA);
		}

		if(!empty($record_a))
			$mx_ip=$record_a[0]['ip'];
		else 
		{
			$result=false;
			$details.="No suitable MX records found.";
			return((true==$getdetails) ? array($result,$details) : $result);
		}
	}
	
	$connect=@fsockopen($mx_ip,25); 
	if($connect)
	{ 
		if(preg_match("/^220/i",$out=fgets($connect,1024)))
		{
			fputs ($connect,"HELO $mx_ip\r\n"); 
			$out=fgets ($connect,1024);
			$details.=$out."\n";
 
			fputs($connect,"MAIL FROM: <$fromemail>\r\n"); 
			$from=fgets($connect,1024); 
			$details.=$from."\n";

			fputs($connect,"RCPT TO: <$toemail>\r\n"); 
			$to=fgets($connect,1024);
			$details.=$to."\n";

			fputs($connect,"QUIT"); 
			fclose($connect);

			if(!preg_match("/^250/i",$from) || !preg_match("/^250/i",$to))
			{
				$result=false; 
			}
			else
			{
				$result=true;
			}
		} 
	}
	else
	{
		$result=false;
		$details.="Could not connect to server";
	}
	if($getdetails)
	{
		return array($result,$details);
	}
	else
	{
		return $result;
	}
}

/******************************************************************************/
/******************************************************************************/