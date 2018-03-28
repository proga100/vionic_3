import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 import { HomePage } from "../home/home";
import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-order-placed',
  templateUrl: 'order-placed.html',
})
export class OrderPlacedPage {

  orderNumber:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.orderNumber = this.navParams.get("orderNumber");

    this.storage.ready().then(()=>{
      this.storage.remove("cart");
    })

  }

  goToHomePage(){
    this.navCtrl.setRoot(HomePage);
  }

}
