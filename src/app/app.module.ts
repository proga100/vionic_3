import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { WooCommerceProvider } from '../providers/woocommerce/woocommerce';
import { Push } from '@ionic-native/push';
import { IonicImageLoader } from 'ionic-image-loader';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CatagoryPage } from '../pages/catagory/catagory';
import { CatagorylistPage } from '../pages/catagorylist/catagorylist';
import { ProductdetailsPage } from '../pages/productdetails/productdetails';
import { ThambnailPage } from '../pages/thambnail/thambnail';
import { CompareitemsPage } from '../pages/compareitems/compareitems';
import { ReadmorePage } from '../pages/readmore/readmore';
import { VendorsPage } from '../pages/vendors/vendors';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';

import { AccountPage} from '../pages/account/account';
import { Cart } from '../pages/cart/cart';
import { Checkout } from '../pages/checkout/checkout';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoldComponent } from '../components/hold/hold';
import { InfoComponent } from '../components/info/info';
import { SortComponent } from '../components/sort/sort';
import { FillterComponent } from '../components/fillter/fillter';
import { SizeComponent } from '../components/size/size';
import { QuantityComponent } from '../components/quantity/quantity';
import { VendorComponent } from '../components/vendor/vendor';
import { CacheModule } from 'ionic-cache';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CatagoryPage,
    CatagorylistPage,
    ProductdetailsPage,
    ThambnailPage,
    HoldComponent,
    CompareitemsPage,
    InfoComponent,
    SortComponent,
    FillterComponent,
    SizeComponent,
    QuantityComponent,
    ReadmorePage,
    VendorsPage,
    VendorComponent,
    SignupPage,
  LoginPage,
   AccountPage,
   Cart,
   Checkout
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot(),
    CacheModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CatagoryPage,
    CatagorylistPage,
    ProductdetailsPage,
    ThambnailPage,
    HoldComponent,
    CompareitemsPage,
    InfoComponent,
    SortComponent,
    FillterComponent,
    SizeComponent,
    QuantityComponent,
    ReadmorePage,
    VendorsPage,
    SignupPage,
  LoginPage,
  AccountPage,
  Cart,
  Checkout
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WooCommerceProvider,
  Push,
  
  ]
})
export class AppModule {}
