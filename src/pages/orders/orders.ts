import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Settings } from '../../settings';
import * as WC from 'virtuemart-api';
// import { ProductDetails } from "../product-details/product-details";
import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  WooCommerce: any;
  orders: any[] = [];
  page: number = 2;
  user_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, private loadingController: LoadingController, private toastController: ToastController, public storage: Storage) {
    
    let loading = this.loadingController.create();
    loading.present();

    this.WooCommerce = WC({
      url: Settings.store_url,
      consumerKey: Settings.consumer_key,
      consumerSecret: Settings.consumer_secret
    });

    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {

        if(userLoginInfo != null){
          this.user_id = userLoginInfo.user.id;
        }
        else {
          console.log("No user found.");
        }

        this.WooCommerce.getAsync("orders?filter[customer_id]=" + this.user_id ).then((orderData) => {
          this.ngZone.run(() => {
            this.orders = JSON.parse(orderData.body).orders;
            loading.dismiss();
          })

          console.log(this.orders);
        })

      })
    })

    

  }

  loadMoreOrders(event) {
    this.WooCommerce.getAsync("orders?filter[customer_id]=" + this.user_id +"&page=" + this.page).then((orderData) => {
      this.ngZone.run(() => {
        let temp = JSON.parse(orderData.body).orders;
        this.orders = this.orders.concat(JSON.parse(orderData.body).orders);
        this.page ++ ;
        event.complete();

        if (temp.length < 10){
          event.enable(false);
          this.toastController.create({
            message: "No more orders.",
            duration: 5000,
            showCloseButton: true
          }).present();
        }

      })

      console.log(this.orders);
    })
  }

  goToProductPage(orderId: string) {

    let loading = this.loadingController.create()
    loading.present();

    this.WooCommerce.getAsync("products/" + orderId).then((productData) => {
      console.log(productData)
      let product = JSON.parse(productData.body).product;
      console.log(product);
      loading.dismiss();
      this.navCtrl.push('ProductDetails', { "product": product });
    })

  }


}
