import { Component, ViewChild } from '@angular/core';
import {IonicPage, Platform, LoadingController,AlertController,Nav,NavController, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { WooCommerceProvider } from "../providers/woocommerce/woocommerce";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
// import { VendorsPage } from '../pages/vendors/vendors';
import { HomePage } from '../pages/home/home';
import { CatagoryPage } from '../pages/catagory/catagory';
import { LoginPage } from '../pages/login/login';
import { SignupPage} from '../pages/signup/signup';
import { AccountPage} from '../pages/account/account';
 import { Cart } from '../pages/cart/cart';
import { Checkout } from '../pages/checkout/checkout';

//import { Settings } from "settings";
import { CacheService } from "ionic-cache";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  private wooCommerce: any;
  categories: any[];
  private loading: any;
  rootPage: any = HomePage;
  loggedIn: boolean;
  user: any;
  @ViewChild('content') childNavCtrl: NavController;
  pages: Array<{title: string, component: any,  image: string}>;

  constructor(
  public platform: Platform, 
  public cache: CacheService,
  public statusBar: StatusBar, 
  public splashScreen: SplashScreen,
 public storage: Storage,
              public push: Push,
              public alertCtrl: AlertController,
              private wooProvider: WooCommerceProvider,
              public loadingCtrl: LoadingController,
              private events: Events
              ) {
                this.user = {};
		 //Create loading
     this.loading = this.loadingCtrl.create();
    this.ionViewDidEnter();	
     this.events.subscribe("user:loggedIn", () => {
      this.ionViewDidEnter();	
    
    //  this.ionViewDidEnter();
    });	  
    this.initializeApp();
    this.wooCommerce = wooProvider.WooCommerce;
    //Load more products
    if (this.wooCommerce) {
     this.LoadMenuCats();
   }

  

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       // Set TTL to 12h
       this.cache.setDefaultTTL(60 * 60 * 12);
 
       // Keep our cached results when device is offline!
       this.cache.setOfflineInvalidate(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    this.initPushNotification();
  
    });
  }

  openPage(page) {
  

  if (page=='checkout'){
    this.nav.push(Checkout);
    return;

  }
  if (page =='login'){
  //  this.nav.setRoot(Login.component);

  this.nav.push(LoginPage, { next: this.childNavCtrl });
 
 

  }else if(page =='signup'){
    this.nav.push(SignupPage)
    }else if (page=='account'){
      this.nav.push(AccountPage)

    }else{
      this.nav.push(CatagoryPage,page );

    }
   
  }
  
   initPushNotification() {
	 
	
    
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device'); 
	  return;
    }
    const options: PushOptions = {
      android: {
        senderID: '819477694829',
         icon: "phonegap",
	    	iconColor: "blue"
		},
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
    // alert('device token -> ' + data.registrationId);
      //TODO - send device token to server

    
     // this.saveToken(data.registrationId);
      let topic = "groups";
      pushObject.subscribe(topic).then((res:any) => {
          console.log("subscribed to topic: ", res);
      });
      
    });

    pushObject.on('notification').subscribe((data: any) => {
     // alert('message -> ' + data.message);
	  
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(HomePage, { message: data.message });
			 //  alert('device tokenize -> ' +  data.message);
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        
		
		
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(HomePage, { message: data.message });
			 //  alert('device tokenize -> ' +  data.message);
            }
          }]
        });
        confirmAlert.present();
		
	//	alert('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

LoadMenuCats(){
  this.categories = [];
        this.wooCommerce.getmeAsync("type=categories&category_id=0").then((data) => {


     let temp: any[] = JSON.parse(data.body).data[0]['children'];

     for( let i = 0; i < temp.length; i ++){
    
         this.categories.push(temp[i]);
     
   
        this.categories[this.categories.length - 1].subCategories = [];
         for (var j = 0; j < temp.length; j++) {

           if(temp[i].id == temp[j].parent){
             this.categories[this.categories.length - 1].subCategories.push(temp[j]);
           }
           
         }

       
     }
    
   



   }, (err)=> {
     console.log(err);
   })


}

ionViewDidEnter() {
  console.log('ssslogi');
  this.storage.ready().then( () => {

    this.storage.get("userLoginInfo").then( (userLoginInfo) => {
      console.log('login',userLoginInfo);
      if(userLoginInfo != null){

        console.log("User logged in...");
        this.user = userLoginInfo;
        console.log('userinfo',this.user);
        this.loggedIn = true;
      }
      else {
        console.log("No user found.");
        this.user = {};
        this.loggedIn = false;
      }

    })
  })


}

}
