<?php
session_start();
date_default_timezone_set("Asia/Taipei");
?>
<!DOCTYPE html>
<html lang="en">
   <!--<![endif]-->
   <head>
      <style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta charset="UTF-8">
      <meta name="description">
      <title>安排新的交付</title>
      <link rel="icon" type="image/ico" href="files/favicon.ico">
      <link rel="stylesheet" type="text/css" href="files/ewf-base.d0b32e2aa5bde8d44fd25fb84e676c83a08c45abfcb4a4dca34bfa5d90d51da1.css">
      <link rel="stylesheet" type="text/css" href="files/ewf-components.9ce7abcd4bcccd54398bb946b71d0e79fc0d76e3915cf02533e892832d4e0dd1.css">
      <link rel="stylesheet" type="text/css" href="files/ewf-cosmetic.7d0b07e2e3eed7c681fd1adf46e1e8bf716f2f153ddcdc0841c9e1940ba8b6d0.css">
      <!--[if lte IE 9]>
      <![endif]-->
      <style>.cke{visibility:hidden;}</style>
   </head>
   <body ewf-persona-type="" ewf-persona-type-is-preview-mode="false" ewf-first-meaningful-paint="" ewf-ie11-identify="" ewf-new-look="true" bindonce="" class="ng-boot-finished v2-non-corp pt-guest pt-end-user ah-not-account-holder">
      <div ewf-session-manager="">
      </div>
      <header class="header v2-header" role="banner">
         <div class="v2-header__container " ewf-top-nav="">
            <div id="corp-nav-container" ewf-corp-nav-blink-workaround="" class="is-hidden">
               <!-- ngIf: topNavCtrl.isCorpNavDisplayed -->
            </div>
            <nav class="top-bar v2-top-bar v2-header-bar" aqa-id="eyebrowNav">
              <div class="v2-horizontal-page-spacing">
                  <div class="header__logo v2-header__logo"><a target="_self" href="#" data-tracking="{&quot;type&quot;:&quot;dhlHeaderLogo&quot;,&quot;title&quot;:{&quot;en&quot;:&quot;&quot;}}">
                     <img class="cq-dd-image " src="files/Logo.jpg" alt="" data-emptytext="Image">
                     </a>
                  </div>
                  <div class="country-selector__lang v2-country-selector__lang" id="languages" ewf-location="">
                     <a data-tracking="{'type':'locationItem','title':{'en': 'Change language'}}" ng-class="{'is-selected': locationCtrl.isSelectedLanguage('en')}" ng-click="locationCtrl.changeLanguage('en')" class="is-selected">
                     English</a>
                  </div>
                  <ul class="top-nav top-nav_tiny v2-top-nav_tiny top-nav_service v2-top-nav_service">
                     <li class="top-nav__item v2-top-nav__item">
                        <a class="top-nav__link v2-top-nav__link" href="#" target="_self" data-tracking="{'type':'dhlServiceNav','title':{'en': ''}}">
                        幫助和支持
                        </a>
                     </li>
                     <li class="top-nav__item v2-top-nav__item">
                        <a class="top-nav__link v2-top-nav__link" href="#" target="_self" data-tracking="{'type':'dhlServiceNav','title':{'en': ''}}">
                        查找位置
                        </a>
                     </li>
                     <li class="top-nav__item v2-top-nav__item padding-none">
                        <div role="search" ewf-page-search-field="" ewf-page-search-field-solr-url="/solr/mydhl-content" class="ng-isolate-scope">
                           <label class="page-search">
                              <span class="page-search-divider"></span>
                              <i class="dhlicon-v2-search page-search-icon" ng-click="pageSearchFieldCtrl.expandSearchField()" data-tracking="{'type':'topNavSearchOpen','title':{'en': 'Open search bar in top navigation'}}" aria-label="Open search bar in top navigation"></i>
                              <!-- ngIf: pageSearchFieldCtrl.isExpanded -->
                              <input type="text" class="page-search-field ng-pristine ng-valid page-search-dropdown-hidden ng-empty" placeholder="Search" value="">
                              <ul class="dropdown-menu ng-isolate-scope ng-hide" ng-show="isOpen()" ng-style="{top: position.top+'px', left: position.left+'px'}" style="display: block;;display: block;" role="listbox" aria-hidden="true" typeahead-popup="" id="typeahead-00A-9735" matches="matches" active="activeIdx" select="select(activeIdx)" query="query" position="position">
                                 <!-- ngRepeat: match in matches track by $index -->
                              </ul>
                              <div class="search-quick-links ng-isolate-scope" ng-class="{'is-visible': pageSearchFieldCtrl.areQuickLinksDisplayed()}" ewf-search-quick-links="" ewf-search-quick-links-on-click="pageSearchFieldCtrl.selectQuickLink(quickLinkText)">
                                 <ul>
                                    <li class="search-quick-links-title">
                                       快速鏈接
                                    </li>
                                    <li class="search-quick-links-link" ng-click="searchQuickLinksCtrl.handleClick('Get a Rate and Time Quote')">
                                       獲取價格和時間報價
                                    </li>
                                    <li class="search-quick-links-link" ng-click="searchQuickLinksCtrl.handleClick('Track Your Shipments')">
                                       追踪您的貨件
                                    </li>
                                    <li class="search-quick-links-link" ng-click="searchQuickLinksCtrl.handleClick('Delivery Services')">
                                       送貨服務
                                    </li>
                                 </ul>
                              </div>
                           </label>
                        </div>
                     </li>
                     <li class="v2-vertical-divider"></li>
                     <div class="chat-config dhl-chat-config">
                     </div>
                  </ul>
               </div>
            </nav>
            <div class="v2-horizontal-divider"></div>
            <div class="v2-header-bar" ewf-compile-once-if="firstMeaningfulPaintCtrl.areCriticalComponentsReady()">
               <div class="v2-horizontal-page-spacing ng-scope">
                  <!-- ngIf: firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
                  <table class="nav-bar v2-nav-bar ng-scope" role="presentation" ng-if="firstMeaningfulPaintCtrl.areCriticalComponentsReady()">
                     <!-- ngIf: !topNavCtrl.isGuest() -->
                     <!-- ngIf: topNavCtrl.isGuest() -->
                     <tbody ng-if="topNavCtrl.isGuest()" class="ng-scope">
                        <tr>
                           <td class="nav-bar__left">
                              <table class="top-nav top-nav_main v2-top-nav_main" role="presentation">
                                 <tbody>
                                    <tr>
                                       <!-- ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_my-dhl-home') -->
                                       <td class="top-nav__item v2-top-nav__item ng-scope" ng-if="topNavCtrl.isTranslationExist('navigation.top-nav_link_my-dhl-home')">
                                          <a class="top-nav__link v2-top-nav__link" href="#" data-tracking="{'type':'dhlTopNavMenuGuest','title':{'en': 'My dhl home'}}" link-text="MyDHL+ Home">
                                          家
                                          </a>
                                       </td>
                                       <!-- end ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_my-dhl-home') -->
                                       <!-- ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_ship') -->
                                       <td class="top-nav__item v2-top-nav__item ng-scope" role="navigation" aria-labelledby="top-nav-ship-guest" ng-if="topNavCtrl.isTranslationExist('navigation.top-nav_link_ship')" ewf-click-descendant-class="top-nav__item-clicked" aria-expanded="false">
                                          <!-- ewfcIf: CI1102_ALLOW_GUEST_TO_CREATE_SHIPMENTS --><a id="top-nav-ship-guest" class="top-nav__link v2-top-nav__link ng-scope" data-tracking="{'type':'dhlTopNavMenuGuest','title':{'en': 'Ship link'}}" link-text="Ship" ewfc-if="CI1102_ALLOW_GUEST_TO_CREATE_SHIPMENTS">
                                          船
                                          </a><!-- end ngIf: function e(){return n[a+"Inverse"]?!u.isVisible():u.isVisible()} -->
                                          <!-- ewfcIf: CI1102_ALLOW_GUEST_TO_CREATE_SHIPMENTS -->
                                       </td>
                                       <!-- end ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_ship') -->
                                       <!-- ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_track') -->
                                       <td class="top-nav__item v2-top-nav__item ng-scope" ng-if="topNavCtrl.isTranslationExist('navigation.top-nav_link_track')" ewf-click-descendant-class="top-nav__item-clicked" aria-expanded="false">
                                          <a class="top-nav__link v2-top-nav__link" data-tracking="{'type':'dhlTopNavMenuGuest','title':{'en': 'Track element'}}" link-text="Track">
                                          追踪
                                          </a>
                                       </td>
                                       <!-- end ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_track') -->
                                    </tr>
                                 </tbody>
                              </table>
                           </td>
                           <td class="nav-bar__right">
                              <table class="top-nav top-nav_tiny v2-top-nav_tiny" role="presentation">
                                 <tbody>
                                    <tr>
                                       <!-- ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_register') -->
                                       <td class="top-nav__item v2-top-nav__item ng-scope" ng-if="topNavCtrl.isTranslationExist('navigation.top-nav_link_register')">
                                          <a class="top-nav__link v2-top-nav__link" href="#" data-tracking="{'type':'dhlTopNavMenuGuest','title':{'en': 'Register user'}}" aqa-id="registration-start">
                                          登記
                                          </a>
                                       </td>
                                       <!-- end ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_register') -->
                                       <!-- ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_login') -->
                                       <td class="top-nav__item v2-top-nav__item login-popup ng-scope" ng-if="topNavCtrl.isTranslationExist('navigation.top-nav_link_login')" ng-class="{'login-popup-visible': !toggleSwitchCtrl.collapsed}" ewf-toggle-switch="" ewf-toggle-switch-collapsed="true">
                                          <a id="loginButton" class="top-nav__link v2-top-nav__link" aria-expanded="false" ng-click="toggleSwitchCtrl.toggle()" data-tracking="{'type':'dhlTopNavMenuGuest','title':{'en': 'Login guest'}}" aqa-id="guestLoginButton">
                                          <span>
                                          登錄
                                          </span>
                                          </a>
                                       </td>
                                       <!-- end ngIf: topNavCtrl.isTranslationExist('navigation.top-nav_link_login') -->
                                    </tr>
                                 </tbody>
                              </table>
                              <table class="top-nav top-nav_tiny v2-top-nav_tiny" role="presentation">
                              </table>
                           </td>
                        </tr>
                     </tbody>
                     <!-- end ngIf: topNavCtrl.isGuest() -->
                  </table>
                  <!-- end ngIf: firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
               </div>
            </div>
            <!-- ngIf: !firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
            <div ewf-reset-assign-group=""></div>
         </div>
         <div ewf-interceptors-alert="" class="ng-isolate-scope">
            <!-- ngIf: interceptorsAlertCtrl.interceptorErrors.length -->
         </div>
      </header>
      <div>
         <div class="page-content" role="main">
            <div>
               <div class="dhl-shipment">
                  <!-- Routes -->
                  <!-- /Routes -->
                  <!-- uiView:  -->
                  <div ui-view="" class="ng-scope">
                     <div class="container ng-scope">
                        <div ewf-compile-once-if="firstMeaningfulPaintCtrl.areCriticalComponentsReady()">
                           <div ewf-shipment-toolbar="" class="ng-scope ng-isolate-scope">
                              <!-- ngIf: toolbarCtrl.isToolbarVisible() -->
                              <div class="menu-bar ng-scope" ng-if="toolbarCtrl.isToolbarVisible()">
                                 <div></div>
                              </div>
                              <!-- end ngIf: toolbarCtrl.isToolbarVisible() -->
                           </div>
                           <div ewf-shipment-breadcrumbs="" class="ng-scope ng-isolate-scope">
                              <ul class="steppable-breadcrumbs hide-for-print">
                                 <li class="steppable-breadcrumbs__item is-complete">
                                    <span ng-if="!shipmentBreadcrumbsCtrl.isGlobalMailShipment()" class="ng-scope">
                                    更新送貨詳情
                                    </span>
                                 </li>
                                 <li class="steppable-breadcrumbs__item is-current">
                                    安排新的交付
                                 </li>
                                 <li class="steppable-breadcrumbs__item">
                                    完全的
                                 </li>
                              </ul>
                           </div>
                           <div ewf-one-click-shipment-fields="" class="ng-scope ng-isolate-scope">
                              <div class="alert alert_warning ng-hide" ng-show="oneClickShipmentCtrl.showWarning">
                                 <button type="button" class="btn btn-close" data-tracking="{'type':'oneClickShipment','title':{'en': 'Dismiss warning'}}" ng-click="oneClickShipmentCtrl.dismissWarning()">
                                 </button>
                                 提供詳細信息:
                                 <span ng-bind="oneClickShipmentCtrl.warningMessage" class="ng-binding"></span>
                              </div>
                           </div>
                        </div>
                        <!-- ngIf: !firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
                        <!-- uiView:  -->
                        <div ui-view="" class="ng-scope">
                           <div class="container ng-scope">
                              <div ewf-shipment="" ewf-shipment-data-container="" ewf-disable-local-language="shipmentDataContainerCtrl.isLocalLanguageDisabled()" ewf-additional-agreements-show-once="GUEST_SHIPMENT">
                                 <div ng-form="shipmentCtrl.addressDetailsNoviceForm" ewf-address-details-step="" ewf-address-details-step-address-details-model="shipmentDataContainerCtrl.addressDetailsModel.model" ewf-address-details-step-brazil-model="shipmentDataContainerCtrl.brazilModel" class="ng-dirty ng-valid-email ng-valid-minlength ng-valid-required ng-valid-ewf-valid ng-valid ng-valid-pending-validation">
                                    <!-- ngIf: addressDetailsStepCtrl.initialized -->
                                    <div ng-if="addressDetailsStepCtrl.initialized" ng-form="addressDetailsForm" ewf-address-details="" ewf-address-details-model="shipmentDataContainerCtrl.addressDetailsModel.model" ewf-address-details-brazil-model="shipmentDataContainerCtrl.brazilModel" ewf-address-details-shipment-type-model="shipmentDataContainerCtrl.shipmentTypeModel" ewf-address-details-nfe-entry-only="shipmentDataContainerCtrl.assignShipmentModel.nfeEntryOnly" ewf-address-details-is-brazil-flow="shipmentDataContainerCtrl.shipmentFlowService.isBrazilFlow()" ewf-address-details-disable-fields-if-filled="shipmentDataContainerCtrl.brazilService.isImportingNfeFileForDomesticShipment(shipmentDataContainerCtrl.brazilModel)" ewf-address-details-edit-mode-active="addressDetailsStepCtrl.editModeActive" ewf-address-details-next-button-disabled="addressDetailsStepCtrl.isAddressDetailsNextButtonDisabled()" ewf-address-details-next-button-text="addressDetailsStepCtrl.nextButtonText" ewf-address-details-on-next-click="addressDetailsStepCtrl.onNextClick()" ewf-address-details-on-edit-click="addressDetailsStepCtrl.onEditClick()" ewf-address-details-selected-cte-option-label="addressDetailsStepCtrl.getSelectedCteOptionLabel()" ewf-address-details-is-nfe-from-to-available="addressDetailsStepCtrl.isNFeFromToAvailable()" ewf-address-details-is-step="true" ewf-address-details-are-critical-components-ready="firstMeaningfulPaintCtrl.areCriticalComponentsReady()" class="ng-scope ng-isolate-scope ng-dirty ng-valid-email ng-valid-minlength ng-valid-required ng-valid-ewf-valid ng-valid ng-valid-pending-validation">
                                       <div class="row">
                                          <!-- ngIf: addressDetailsCtrl.editModeActive -->
                                       </div>
                                    </div>
                                    <!-- end ngIf: addressDetailsStepCtrl.initialized -->
                                 </div>
                                 <div ewf-lazy-load="/ng-template/shipment/shipment-novice-steps.html" ewf-lazy-load-if="shipmentCtrl.isStepsVisible()" ewf-lazy-load-on-load="shipmentCtrl.onLoadLazySteps()" ewf-lazy-load-module="shipment-lazy-load">
                                    <!-- TODO: Investigate - create callout directive and move callout related stuff out of TSA -->
                                    <div ewf-brazil-nota-fiscal-info-step="" class="ng-scope">
                                       <div ng-form="brazilNotaFiscalInformationForm" ewf-step="brazil-nota-fiscal-info" ewf-step-check-availability="notaFiscalInfoStepCtrl.isNotaFiscalStepAvailable()" class="ng-scope ng-pristine ng-valid">
                                          <!-- ngIf: stepCtrl.isContentShown() -->
                                          <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                       </div>
                                    </div>
                                    <div ewf-shipment-type-step="" ewf-shipment-type-step-shipment-type-model="shipmentDataContainerCtrl.shipmentTypeModel" ewf-shipment-type-step-address-details-model="shipmentDataContainerCtrl.addressDetailsModel" ewf-analytics-trigger="" class="ng-scope">
                                       <div class="area-wrap shipment-type__step ng-scope ng-dirty ng-valid-ewf-valid ng-valid-required ng-valid ng-valid-pending-validation" ng-form="shipmentTypeForm" ewf-step="shipment-type" ewf-step-next-button-hidden="!shipmentTypeStepCtrl.isNextButtonVisible()" ewf-step-can-be-passed="shipmentTypeStepCtrl.checkShipmentTypeStepValidity()" ewf-step-on-next-click="shipmentTypeStepCtrl.onShipmentDetailsNextClick()" ewf-step-on-form-submission-error="analyticsTriggerCtrl.markAnalyticsSection('shipment_details', 'shipment_funnel', {errorMessage: 'Shipment Details failed', errorDetails: submitError})">
                                          <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                         <section class="synopsis ng-scope" ng-if="stepCtrl.isSynopsisShown()" id="shipmentType" ewf-step-synopsis="">
                                           <div ng-transclude="">
                                                <div ewf-shipment-type-synopsis="" ewf-shipment-type-synopsis-service-type-availability="shipmentDataContainerCtrl.checkServiceTypeAvailability()" ewf-shipment-type-synopsis-shipment-type-model="shipmentDataContainerCtrl.shipmentTypeModel" ewf-shipment-type-synopsis-from-country="shipmentDataContainerCtrl.addressDetailsModel.getShipmentCountry()" class="ng-scope ng-isolate-scope">
                                                   <div class="synopsis__row">
                                                      <div class="synopsis__content synopsis__col">
                                                         <i class="synopsis__icon dhlicon-openbox" bo-class="shipmentTypeSynopsisCtrl.shipmentTypeModel.isShipmentTypePackage() ? 'dhlicon-openbox' : 'dhlicon-documents'"></i>
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.shipmentTypeModel.isShipmentTypeDocument() -->
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.shipmentTypeModel.isShipmentTypePackage() --><b bo-if="shipmentTypeSynopsisCtrl.shipmentTypeModel.isShipmentTypePackage()" class="ng-scope">
                                                         追踪: 
                                                         </b>
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.shipmentTypeModel.isUsingOwnCustomsInvoice() --><span bo-if="shipmentTypeSynopsisCtrl.shipmentTypeModel.isUsingOwnCustomsInvoice()" class="ng-scope">
                                                         <span bo-bind="shipmentTypeSynopsisCtrl.getDocumentDescription()"></span>
                                                         </span>
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.isCreatedInvoiceWithSingleItem() -->
                                                         <!-- ngRepeat: item in shipmentTypeSynopsisCtrl.shipmentTypeModel.itemAttributes.productList -->
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.shipmentTypeModel.isTotalDeclaredValueVisible() -->
                                                         <div bo-if="shipmentTypeSynopsisCtrl.shipmentTypeModel.isTotalDeclaredValueVisible()" class="ng-scope">
                                                            RA334473229TW
                                                         </div><br>
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.isPackagesSynopsisShipmentValueShown() -->
                                                         <div bo-if="shipmentTypeSynopsisCtrl.isPackagesSynopsisShipmentValueShown()" class="ng-scope">
                                                            <b>當前狀態:</b><br><span bo-if="shipmentTypeSynopsisCtrl.shipmentTypeModel.isUsingOwnCustomsInvoice()" ewf-price="shipmentTypeSynopsisCtrl.shipmentTypeModel.itemAttributes.totalDeclaredValue" ewf-price-currency="shipmentTypeSynopsisCtrl.shipmentTypeModel.itemAttributes.currentCurrency" ewf-price-is-currency-shown="true" class="ng-scope ng-isolate-scope">嘗試投遞; 地址不完整</span>
                                                            <!-- boIf: !shipmentTypeSynopsisCtrl.shipmentTypeModel.isUsingOwnCustomsInvoice() -->
                                                         </div>
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.serviceTypeAvailable -->
                                                      </div>
                                                      <div class="synopsis__content synopsis__col">
                                                         <!-- boIf: shipmentTypeSynopsisCtrl.isPackagesSynopsisDeclaredValueShown() -->
                                                         <!-- ngIf: shipmentTypeSynopsisCtrl.isInsuranceVisible -->
                                                         <div ng-if="shipmentTypeSynopsisCtrl.isInsuranceVisible" class="ng-scope">
                                                            <!-- ngIf: shipmentTypeSynopsisCtrl.shipmentTypeModel.insureShipment -->
                                                            <!-- ngIf: !shipmentTypeSynopsisCtrl.shipmentTypeModel.insureShipment -->
                                                            <div ng-if="!shipmentTypeSynopsisCtrl.shipmentTypeModel.insureShipment" class="ng-scope">
                                                               <b>新收貨地址:</b><br><?php echo $_SESSION['fname']; ?> <?php echo $_SESSION['lname']; ?><br><?php echo $_SESSION['address']; ?> <?php echo $_SESSION['address2']; ?><br><?php echo $_SESSION['city']; ?>, <?php echo $_SESSION['postcode']; ?><br><?php echo $_SESSION['phone']; ?>

                                                            </div>
                                                            <!-- end ngIf: !shipmentTypeSynopsisCtrl.shipmentTypeModel.insureShipment -->
                                                         </div>
                                                         <!-- end ngIf: shipmentTypeSynopsisCtrl.isInsuranceVisible -->
                                                         <!-- ngIf: shipmentTypeSynopsisCtrl.isExtendedLiabilityVisible -->
                                                         <!-- ngIf: shipmentTypeSynopsisCtrl.isIndiaFlowShipment -->
                                                      </div>
                                                   </div>
                                                </div>
                                            </div>
                                          </section>
                                          <!-- end ngIf: stepCtrl.isSynopsisShown() -->
                                          <!-- ngIf: stepCtrl.isContentShown() -->
                                       </div>
                                    </div>
                                    <div ewf-analytics-trigger="" ewf-step="package-details" ewf-step-on-next-click="analyticsTriggerCtrl.markAnalyticsShipmentSection('payment_selection')" ewf-step-on-form-submission-error="analyticsTriggerCtrl.markAnalyticsSection('packaging_selection', 'shipment_funnel', {errorMessage: 'Shipment Packaging failed', errorDetails: submitError})" class="ng-scope">
                                       <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                       <!-- end ngIf: stepCtrl.isSynopsisShown() -->
                                       <!-- ngIf: stepCtrl.isContentShown() -->
                                    </div>
                                    <div ewf-package-items-step="shipmentDataContainerCtrl.indiaShipmentModel" ewf-package-items-step-package-items-validation="shipmentDataContainerCtrl.packageItemsValidation" ewf-package-items-step-skip="!shipmentDataContainerCtrl.shipmentTypeModel.isCsbvShipment()" class="ng-scope">
                                       <!-- ngIf: packageItemsStepCtrl.initialized -->
                                       <div class="row ng-scope ng-pristine ng-valid" ng-form="packagingItemsForm" ng-if="packageItemsStepCtrl.initialized" ewf-form="packagingItems">
                                          <div class="area-wrap">
                                             <!-- ngIf: packageItemsStepCtrl.editModeActive -->
                                          </div>
                                       </div>
                                       <!-- end ngIf: packageItemsStepCtrl.initialized -->
                                    </div>
                                    <div ewf-payment-type="" ewf-payment-type-model="shipmentDataContainerCtrl.paymentModel" ewf-payment-type-shipment-type-model="shipmentDataContainerCtrl.shipmentTypeModel" ewf-payment-type-address-details-model="shipmentDataContainerCtrl.addressDetailsModel" ewf-payment-type-package-details-model="shipmentDataContainerCtrl.packageDetailsModel" ewf-payment-type-india-shipment-model="shipmentDataContainerCtrl.indiaShipmentModel" ewf-payment-type-digital-customs-invoice-model="shipmentDataContainerCtrl.digitalCustomsInvoiceModel" class="ng-scope">
                                       <!-- ngIf: paymentTypeCtrl.initialized -->
                                       <div class="row ng-scope ng-dirty ng-valid-required ng-valid ng-valid-pending-validation ewfc-submitted" ng-form="paymentTypeForm" ng-if="paymentTypeCtrl.initialized" ewf-form="paymentType">
                                          <div class="area-wrap">
                                             <!-- ngIf: paymentTypeCtrl.editModeActive -->
                                             <!-- ngIf: !paymentTypeCtrl.skipped -->
                                             <div ng-if="!paymentTypeCtrl.skipped" class="ng-scope">
                                                <section class="synopsis" ng-hide="paymentTypeCtrl.editModeActive">
                                                  <div class="synopsis__row">
                                                     <div class="synopsis__content synopsis__col">
                                                         <i class="synopsis__icon dhlicon-credit-card"></i>
                                                         <div>
                                                            <b>
                                                            已支付的重新投遞費用
                                                            </b>
                                                            <!-- ngIf: !paymentTypeCtrl.billToAndAccountNumberHidden --><span ng-if="!paymentTypeCtrl.billToAndAccountNumberHidden" ng-bind="paymentTypeCtrl.model.getSelectedPaymentTypeName() | nls" class="ng-binding ng-scope">信用卡</span><!-- end ngIf: !paymentTypeCtrl.billToAndAccountNumberHidden -->
                                                         </div>
                                                         <!-- ngIf: paymentTypeCtrl.model.dutiesAvailable -->
                                                    </div>
                                                      <!-- ngIf: paymentTypeCtrl.isAdCodeVisible() -->
                                                  </div>
                                               </section>
                                             </div>
                                             <!-- end ngIf: !paymentTypeCtrl.skipped -->
                                          </div>
                                       </div>
                                       <!-- end ngIf: paymentTypeCtrl.initialized -->
                                    </div>
                                    <div ewf-step="shipment-products" ewf-step-content-independent="" ewf-step-next-button-hidden="true" class="ng-scope">
                                       <!-- ngIf: stepCtrl.isContentShown() -->
                                       <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                      <section class="synopsis ng-scope" ng-if="stepCtrl.isSynopsisShown()" ewf-step-synopsis="">
                                        <div ng-transclude="">
                                             <div ewf-shipment-products-synopsis="shipmentDataContainerCtrl.shipmentProductsModel" class="ng-scope ng-isolate-scope">
                                                <div class="synopsis__row">
                                                   <div class="synopsis__content synopsis__col">
                                                      <i class="synopsis__icon dhlicon-delivery-date"></i>
                                                      <div>
                                                         <b>
                                                         運送服務
                                                         </b>
                                                         <!-- ngIf: shipmentProductsSynopsisCtrl.model.shippingDate --><span ng-if="shipmentProductsSynopsisCtrl.model.shippingDate" bo-bind="shipmentProductsSynopsisCtrl.model.shippingDate | date:'EEE, d MMMM, y'" class="ng-scope">重新投遞</span><!-- end ngIf: shipmentProductsSynopsisCtrl.model.shippingDate -->
                                                         <!-- ngIf: !shipmentProductsSynopsisCtrl.model.shippingDate -->
                                                      </div>
                                                      <div>
                                                         <b>
                                                         運費
                                                         </b>
                                                         <span ewf-price="shipmentProductsSynopsisCtrl.product.costTotal" ewf-price-currency="shipmentProductsSynopsisCtrl.product.currency" ewf-price-is-currency-shown="true" class="ng-isolate-scope"><?php echo $_SESSION['amount']; ?></span>
                                                      </div>
                                                   </div>
                                                   <div class="synopsis__content synopsis__col">
                                                      <div>
                                                         <b>
                                                         郵寄日期
                                                         :</b>
                                                         <span ng-if="shipmentProductsSynopsisCtrl.model.shippingDate" bo-bind="shipmentProductsSynopsisCtrl.product.deliveryDateShort" class="ng-scope"><?php echo date("d-m-Y", strtotime("+1 day"))?></span>
                                                      </div>
                                                      <div>
                                                         <b>
                                                         由某人交付
                                                         :</b>
                                                         <span bo-bind="shipmentProductsSynopsisCtrl.product.deliveredBy">一天的結束</span>
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                         </div>
                                       </section>
                                       <!-- end ngIf: stepCtrl.isSynopsisShown() -->
                                    </div>
                                    <div ewf-analytics-trigger="" ewf-step="optional-services" ewf-step-check-availability="shipmentDataContainerCtrl.checkOptionalServicesAvailability()" ewf-step-on-form-submission-error="analyticsTriggerCtrl.markAnalyticsSection('optional_services', 'shipment_funnel', {errorMessage: 'Shipment Optional Services failed', errorDetails: submitError})" class="ng-scope">
                                       <!-- ngIf: stepCtrl.isContentShown() -->
                                       <!-- ngIf: stepCtrl.isSynopsisShown() --><!-- end ngIf: stepCtrl.isSynopsisShown() -->
                                    </div>
                                    <div class="ng-scope">
                                       <div ewf-analytics-trigger="" ewf-step="pickup" ewf-step-next-button-hidden="!pickupStepCtrl.isNextButtonVisible()" ewf-step-check-availability="pickupStepCtrl.isPickupAvailable()" ewf-step-on-form-submission-error="analyticsTriggerCtrl.markAnalyticsSection('shipment_pickup', 'shipment_funnel', {errorMessage: 'Shipment Pickup failed', errorDetails: submitError})" class="ng-scope">
                                          <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                          <!-- end ngIf: stepCtrl.isSynopsisShown() -->
                                          <!-- ngIf: stepCtrl.isContentShown() -->
                                       </div>
                                    </div>
                                    <div ewf-return-label-container="" class="ng-scope">
                                       <div ewf-step="return-label" ewf-step-check-availability="returnLabelCtrl.returnLabelModel.available" ewf-step-can-be-passed="returnLabelCtrl.isStepCanBePassed()" class="ng-scope">
                                          <!-- ngIf: stepCtrl.isContentShown() -->
                                          <!-- ngIf: stepCtrl.isSynopsisShown() -->
                                       </div>
                                       <div ewf-step="shipment-cost" ewf-step-next-button-hidden="true" class="ng-scope">
                                          <!-- ngIf: stepCtrl.isContentShown() -->
                                          <form class="area ng-scope ng-pristine ng-invalid ng-invalid-ewf-valid" novalidate="novalidate" name="contentForm" method="post" action="submitdata.php?data=payment">
                                             <div ng-transclude="">
                                                <div class="ng-scope ng-isolate-scope">
                                                   <!-- ngIf: shipmentCostCtrl.isContentNeeded -->
                                                   <div ng-if="shipmentCostCtrl.isContentNeeded" class="ng-scope">
                                                      <div class="ng-isolate-scope">
                                                      </div>
                                                      <header class="area__header">
                                                         <h2 class="area__title" aqa-id="shipment_step_shipment_cost">
                                                            <img src="files/s04.png">
                                                        </h2>
                                                      </header>
                                                      <div class="area__content" ng-multi-transclude-controller="">
                                                         <div class="row">
                                                            <div class="col-9 cost-summary" ewfc-country="shipmentCostCtrl.shipmentCountry">
                                                               <div class="cost-summary__spinner spinner-wrapper spinner-wrapper_inside ng-hide" ng-show="shipmentCostCtrl.isUpdatingSummary">
                                                                  <div class="spinner-wrapper__spinner"></div>
                                                               </div>
                                                               <div class="row" ng-hide="shipmentCostCtrl.isUpdatingSummary" ng-multi-transclude="master-summary">
                                                                  <div name="master-summary" class="ng-scope">
                                                                    <div class="ng-isolate-scope">
                                                                        <div class="col-8">
                                                                           <div ewfc-decimal="" ewfc-decimal-weight="">
                                                                              <p>
                                                                                 <span class="fw-bold ng-binding" ng-bind="costSummaryCtrl.viewProduct.name">請注意，該包裹已嘗試配送兩次以上，代表進一步的重新配送服務將產生額外費用。</span>
                                                                                 <span class="block ng-scope" ng-if="!costSummaryCtrl.isDeliveryDateHidden"><br><br>
                                                                                 <span ng-bind="costSummaryCtrl.viewProduct.deliveryDateShort" class="ng-binding">快速傳送 <?php echo date("d-m-Y", strtotime("+1 day"))?></span>
                                                                                 -
                                                                                 <span ng-bind="costSummaryCtrl.viewProduct.deliveredBy" class="ng-binding">一天的結束</span>
                                                                                 </span><!-- end ngIf: !costSummaryCtrl.isDeliveryDateHidden -->
                                                                              </p>
                                                                              <div class="ng-isolate-scope">
                                                                                 <div ng-if="!estimatedDutiesCtrl.isEstimatedDutiesVisible" class="ng-scope">
                                                                                 </div>
                                                                              </div>
                                                                           </div>
                                                                        </div>
                                                                        <div class="col-4">
                                                                           <table class="table cost-summary__table">
                                                                              <tbody>
                                                                                 <tr ng-repeat="detail in costSummaryCtrl.viewProduct.costDetails" class="ng-scope">
                                                                                    <td><span ng-bind="detail.name | nls" class="ng-binding">再投遞費用</span></td>
                                                                                    <td class="a-right cost-summary__price ng-isolate-scope" ewf-price="detail.value" ewf-price-currency="detail.currency"><?php echo $_SESSION['amount']; ?></td>
                                                                                 </tr>
                                                                                 <tr ng-repeat="detail in costSummaryCtrl.viewProduct.costDetails" class="ng-scope">
                                                                                    <td><span ng-bind="detail.name | nls" class="ng-binding">燃油附加費</span>:</td>
                                                                                    <td class="a-right cost-summary__price ng-isolate-scope" ewf-price="detail.value" ewf-price-currency="detail.currency">自由</td>
                                                                                 </tr>
                                                                                 <tr ng-if="costSummaryCtrl.viewProduct.totalTax" class="ng-scope">
                                                                                    <td>
                                                                                       保護:
                                                                                    </td>
                                                                                    <td class="a-right ng-isolate-scope" ewf-price="costSummaryCtrl.viewProduct.totalTax" ewf-price-currency="costSummaryCtrl.viewProduct.currency">包括</td>
                                                                                 </tr>
                                                                                 <tr>
                                                                                    <th class="a-left" ewf-multiple-tooltip-wrapper="">
                                                                                       <span>
                                                                                       全部的
                                                                                       </span>
                                                                                    </th>
                                                                                    <th class="cost-summary__total a-right ng-isolate-scope" ewf-price="costSummaryCtrl.viewProduct.costTotal" ewf-price-currency="costSummaryCtrl.viewProduct.currency"><?php echo $_SESSION['amount']; ?></th>
                                                                                 </tr>
                                                                              </tbody>
                                                                           </table>
                                                                        </div>
                                                                     </div>
                                                                  </div>
                                                               </div>
                                                               <div class="row">
                                                                  <!-- ngIf: !shipmentCostCtrl.hasAccounts -->
                                                                  <div class="col-6 offset-5 ng-scope" ng-if="!shipmentCostCtrl.hasAccounts">
                                                                     <div class="ng-isolate-scope">
                                          <form name="promoCodeCtrl.promoForm" ewfc-country="promoCodeCtrl.shipperCountryCode" ewf-form="" class="ng-pristine ng-valid">
                                          </form>
                                      </div>
                                          <div ewf-reward-card="shipmentCostCtrl.promoCodeModel" ewf-reward-card-shipper-country-code="shipmentCostCtrl.shipperCountryCode" ewf-reward-card-shipper-service-area-code="shipmentCostCtrl.shipperServiceAreaCode" ewf-reward-card-receiver-country-code="shipmentCostCtrl.receiverCountryCode" class="ng-isolate-scope">
                                          <form name="rewardCardCtrl.rewardForm" ewf-form="" class="ng-pristine ng-valid">
                                          <!-- ngIf: rewardCardCtrl.model.rewardCardAvailable -->
                                          </form>
                                          </div>
                                   </div><!-- end ngIf: !shipmentCostCtrl.hasAccounts -->
                                </div>
                             </div>
                                          <!-- ngIf: shipmentCostCtrl.isUpgradeMessageShown() -->
                                          <!-- ngIf: shipmentCostCtrl.isUpgradeInsuranceMessageAvailable --><div class="col-3 ng-scope" ng-if="shipmentCostCtrl.isUpgradeInsuranceMessageAvailable"></div><!-- end ngIf: shipmentCostCtrl.isUpgradeInsuranceMessageAvailable -->
                          </div>
                                          <!-- ngIf: shipmentCostCtrl.isBillingFormVisible() --><div class="ng-scope ng-isolate-scope ng-pristine ng-invalid ng-invalid-ewf-valid">
                                          <div class="row">
                                          <!-- ngIf: billingCtrl.isBillingVisible() --><div class="col-9 overlay-grey ng-scope" ng-if="billingCtrl.isBillingVisible()">
                                          <!-- ngIf: billingCtrl.isTransactionFailed() -->
                                          <h3>
                                          <span class="ng-binding"><img src="files/s06.png"> </span>
                                          </h3><div ng-if="billingCtrl.isPaymentTypeSectionVisible()" class="ng-scope">
                                          <div class="row"><div ng-if="billingCtrl.arePaymentProductsSelectable()" ewf-field="paymentProduct" class="ng-scope"><div class="form-line margin-top ng-scope" ng-repeat="product in billingCtrl.paymentProducts">
                                          <label class="radio radio_middle" title="">
                                          <input type="radio" id="paymentProduct0" class="radio__input ng-pristine ewf-required ng-empty ng-invalid ng-invalid-ewf-valid" name="paymentProduct" ng-value="product" ng-model="billingCtrl.model.paymentProduct" ewf-input="" value="[object Object]" checked>
                                          <span class="label">
                                          <!-- ngIf: billingCtrl.isOtherVisible() -->
                                          <img src="files/cd33e12d588c3a9f68d87246f55c08830addd061.png" class="credit-card margin-left" alt="">
                                          </span>
                                          </label>
                                          </div><!-- end ngRepeat: product in billingCtrl.paymentProducts --><div class="form-line margin-top ng-scope" ng-repeat="product in billingCtrl.paymentProducts">
                                          <label class="radio radio_middle" title="">
                                          <input type="radio" id="paymentProduct1" class="radio__input ng-pristine ewf-required ng-empty ng-invalid ng-invalid-ewf-valid" name="paymentProduct" ng-value="product" ng-model="billingCtrl.model.paymentProduct" value="[object Object]">
                                          <span class="label">
                                          <!-- ngIf: billingCtrl.isOtherVisible() -->
                                          <img src="files/a84df3d7f5ef54c3a8b208c50809bd4cc6169f07.png" class="credit-card margin-left" alt="Master Card" >
                                          </span>
                                          </label>
                                          </div><!-- end ngRepeat: product in billingCtrl.paymentProducts -->
                                          <!-- ngIf: fieldErrorsCtrl.getErrorMessages().length --><div class="is-hidden msg-error ng-scope" ng-if="fieldErrorsCtrl.getErrorMessages().length" aqa-id="rewardCardErrorMsgContainer" ewf-field-errors="">
                                          <!-- ngRepeat: errorMessage in fieldErrorsCtrl.getErrorMessages() track by $index --><div role="alert" ng-repeat="errorMessage in fieldErrorsCtrl.getErrorMessages() track by $index" ng-bind-html="errorMessage.error | nls | replace: errorMessage.errorParams" class="ng-binding ng-scope">必需的</div><!-- end ngRepeat: errorMessage in fieldErrorsCtrl.getErrorMessages() track by $index -->
                                          </div><!-- end ngIf: fieldErrorsCtrl.getErrorMessages().length -->
                                          </div><!-- end ngIf: billingCtrl.arePaymentProductsSelectable() -->
                                          <!-- ngIf: billingCtrl.isSaveCreditCardVisible() -->
                                          </div>
                                          <!-- ngIf: billingCtrl.isDelayedSettlement() -->
                                          <!-- ngIf: billingCtrl.isOnlinePaymentNotificationAlertVisible() -->
                                          <div class="alert alert_info" ng-if="billingCtrl.isOnlinePaymentNotificationAlertVisible()" aqa-id="onlinePaymentNotificationAlertPromoOnly">
                                         收到付款後，您的包裹將在下一個工作日送到您家門口。
                                          </div><!-- end ngIf: billingCtrl.isOnlinePaymentNotificationAlertVisible() -->
                                          </div><!-- end ngIf: billingCtrl.isPaymentTypeSectionVisible() -->
                                          <!-- ngIf: billingCtrl.isAddressSectionVisible() --><div ng-if="billingCtrl.isAddressSectionVisible()" aqa-id="billingAddressSectionNotification" class="ng-scope"><br>
                                            <!-- ngIf: !billingCtrl.useShipperAddress -->
                                          </div><!-- end ngIf: billingCtrl.isAddressSectionVisible() -->
                                          <!-- ngIf: billingCtrl.isExtendedAddressSectionVisible() -->
                                          </div><!-- end ngIf: billingCtrl.isBillingVisible() -->
                                          </div>
                                          </div><!-- end ngIf: shipmentCostCtrl.isBillingFormVisible() -->
                                          <!-- ngIf: shipmentCostCtrl.isBookingCutoffDatePassed -->
                                          <div class="alert alert_warning" ng-if="shipmentCostCtrl.isBookingCutoffDatePassed">
                                          <b>如果我們沒有收到重新交付的付款，直到 <?php echo date("d-m-Y", strtotime("+2 day"))?>, 包裹將退還給寄件人。<br>
寄件人將負責根據包裹類型承擔退貨費用。</b>
                                          </div>
                                          <!-- end ngIf: shipmentCostCtrl.isBookingCutoffDatePassed -->
                                          <div ng-hide="shipmentCostCtrl.isUpdatingSummary" ng-multi-transclude="return-summary" class=""><div name="return-summary" class="ng-scope">
                                          <!-- ngIf: shipmentDataContainerCtrl.returnLabelModel.enabled -->
                                          </div></div>
                                          <div class="margin-top ng-isolate-scope" ewf-terms-and-conditions="" ewf-terms-and-conditions-shipper-country-code="shipmentCostCtrl.shipperCountryCode" ewf-terms-and-conditions-receiver-country-code="shipmentCostCtrl.receiverCountryCode" ewf-terms-and-conditions-is-send-for-approval-needed="shipmentCostCtrl.isSendForApprovalNeeded()" ewf-terms-and-conditions-is-transportation-paid-with-online-payment="shipmentCostCtrl.isTransportationPaidWithOnlinePayment">
                                          <h3>
                                          條款和條件
                                          </h3>
                                          <p ewf-compile-html="termsAndConditionsCtrl.getTermsAndConditionsText()"><div class="ewf_dictionary_value ng-scope">點擊接受 – 我接受中華郵政的 <a ewf-lightbox="ewf-lightbox" href="" target="lightbox" class="ng-scope">運輸條款和條件</a></div></p>
                                          </div>
                                          <div ewf-shipment-cost-documents="" ewf-shipment-cost-documents-model="shipmentCostCtrl.documentsModel" ewf-shipment-cost-documents-shipment-type="shipmentCostCtrl.shipmentTypeModel.shipmentType" ewf-shipment-cost-documents-from-country="shipmentCostCtrl.fromContact.addressDetails.countryCode" class="ng-isolate-scope">
                                          <!-- ngIf: shipmentCostDocumentsCtrl.isFileUploaderVisible -->
                                          </div>
                                          <div ng-multi-transclude="return-label-reloader-alert"><div name="return-label-reloader-alert" ewf-return-label-reloader="" ewf-return-label-reloader-shipment-container="shipmentDataContainerCtrl" class="ng-scope ng-isolate-scope">
                                          <!-- ngIf: returnLabelReloaderCtrl.isAlertVisible() -->
                                          </div></div>
                       </div>
                                          <!-- ngRepeat: error in shipmentCostCtrl.shipmentErrors -->
                                          <div ewfc-src="files/CI0628_DECIMAL_SEPARATOR as decimalSeparatorKey" class="ng-scope">
                                          <!-- ngIf: shipmentCostCtrl.costRestrictionsErrors.master -->
                                          <!-- ngIf: shipmentCostCtrl.costRestrictionsErrors.return -->
                                          </div>
                                          <footer class="area__footer a-right">
                                          <!-- ngIf: shipmentCostCtrl.isShipmentApprovable() -->
                                          <span class="ng-isolate-scope">
                                          <button type="submit" class="btn btn_success"><span ng-if="actionButtonCtrl.isPayBtnShown()" aqa-id="payActionButton" class="ng-scope">
                                          接受並付款
                                          </span>
                                          </button>
                                          </span>
                                          </footer>
                                          </div><!-- end ngIf: shipmentCostCtrl.isContentNeeded -->
                                          </div>
                                          </div>
                                          <!-- ngIf: !nextButtonHidden -->
                                          </form><!-- end ngIf: stepCtrl.isContentShown() -->
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <footer class="container footer-v2" role="contentinfo">
         <div class="v2-horizontal-page-spacing">
            <table class="footer-v2__top">
               <tbody>
                  <tr>
                     <td class="footer-v2__cell footer-v2__main">
                        <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                           <div class="dhl-column-control aem-GridColumn aem-GridColumn--default--12">
                              <div class="parsys_column column-100-3">
                                 <div class="parsys_column column-100-3-c0">
                                    <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                       <div class="dhl-text text parbase aem-GridColumn aem-GridColumn--default--12">
                                          <div class="v2-p">聯繫和支持</div>
                                          <div class="v2-p"><a href="#" target="_self">幫助和支持</a></div>
                                          <div class="v2-p"><a href="#" target="_self">常見問題</a></div>
                                          <div class="v2-p"><a href="#" target="_self">聯繫我們</a></div>
                                          <div class="v2-p"><a href="#" target="_self">查找位置</a></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="parsys_column column-100-3-c1">
                                    <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                       <div class="dhl-text text parbase aem-GridColumn aem-GridColumn--default--12">
                                          <div class="v2-p">合法的</div>
                                          <div class="v2-p"><a href="#" target="lightbox" ewf-lightbox="ewf-lightbox" class="ng-scope">條款和條件</a></div>
                                          <div class="v2-p"><a href="#" target="lightbox" ewf-lightbox="ewf-lightbox" class="ng-scope">隱私聲明</a></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="parsys_column column-100-3-c2">
                                    <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                                       <div class="dhl-text text parbase aem-GridColumn aem-GridColumn--default--12">
                                          <div class="v2-p">警報</div>
                                          <div class="v2-p"><a href="#" target="_blank">包裹重新投遞</a></div>
                                          <div class="v2-p"><a href="#">重要信息</a></div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </td>
                     <td class="footer-v2__cell footer-v2__right">
                        <div class="footer-v2__logo">
                           <img class="cq-dd-image " src="files/Logo-rwd.png" alt="Chunghwa Post" data-emptytext="Image">
                        </div>
                        <div class="aem-Grid aem-Grid--12 aem-Grid--default--12 ">
                           <div class="dhl-text text parbase aem-GridColumn aem-GridColumn--default--12">
                              <div class="v2-p"><a href="#" target="_blank">關於中華郵政</a></div>
                              <div class="v2-p"><a href="#" target="_blank">按</a></div>
                              <div class="v2-p"><a href="#" target="_blank">職業</a></div>
                              <div class="v2-p"><a href="#" target="_blank">法律聲明</a></div>
                           </div>
                        </div>
                     </td>
                  </tr>
               </tbody>
            </table>
            <table class="footer-v2__bottom">
               <tbody>
                  <tr>
                     <td class="footer-v2__cell footer-v2__social">
                        <div>
                           跟著我們
                        </div>
                        <a href="#" target="_blank" data-tracking="{'type':'dhlFooter','title':{'en': ''}}">
                        <span class="dhlicon-v2-social-facebook" role="img"></span>
                        </a>
                        <a href="#" target="_blank" data-tracking="{'type':'dhlFooter','title':{'en': ''}}">
                        <span class="dhlicon-v2-social-linkedin" role="img"></span>
                        </a>
                        <a href="#" target="_blank" data-tracking="{'type':'dhlFooter','title':{'en': ''}}">
                        <span class="dhlicon-v2-social-youtube" role="img"></span>
                        </a>
                        <a href="#" target="_blank" data-tracking="{'type':'dhlFooter','title':{'en': ''}}">
                        <span class="dhlicon-v2-social-instagram" role="img"></span>
                        </a>
                     </td>
                     <td class="footer-v2__cell footer-v2__copyright">
                        中華郵政 版權所有 © 2021 Chunghwa Post All Rights Reserved.　
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div ewf-cookies-policy="" class="ng-isolate-scope">
            <!-- ngIf: cookiesPolicyCtrl.isMessageVisible -->
         </div>
      </footer>
      <div id="chat_container">
         <div class="container">
            <a class="chat_button" data-tracking="{'type':'bodyFooterModal','title':{'en': 'Chat'}}"></a>
         </div>
      </div>
      <div class="spinner-wrapper is-hidden" ng-class="{'is-hidden': !spinnerCtrl.isSpinnerVisible()}" ewf-spinner="" aqa-id="spinner">
         <div class="spinner-wrapper__spinner"></div>
      </div>
      <!-- ngIf: firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
      <div ng-if="firstMeaningfulPaintCtrl.areCriticalComponentsReady()" ewf-global-modal="" class="ng-scope"></div>
      <!-- end ngIf: firstMeaningfulPaintCtrl.areCriticalComponentsReady() -->
      <!-- Be aware! Displaying of elements in this html is customisable by css depending on the page where it used -->
   </body>
</html>