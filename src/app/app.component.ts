import { Component, ViewChild } from '@angular/core';
import { AlertController,Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import * as WC from 'woocommerce-api';
import { VendorsPage } from '../pages/vendors/vendors';
import { HomePage } from '../pages/home/home';
//import { Settings } from "settings";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
   WooCommerce: any;
  categories: any[];

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,  image: string}>;

  constructor(
  public platform: Platform, 
  public statusBar: StatusBar, 
  public splashScreen: SplashScreen,
              public push: Push,
              public alertCtrl: AlertController) {
				  
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    this.initPushNotification();
    this.categories = [];
    this.WooCommerce = WC({
     url: 'http://localhost/virtuemart/v3212',
   // url: 'https://www.cisupplystore.com/newvm',
     consumerKey: 'sdgfsdg',
     consumerSecret: 'erherht'
   });
/*
 
     this.WooCommerce.getmeAsync("type=categories&category_id=0").then((data) => {


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

*/

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
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



}
