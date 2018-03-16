import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Settings } from '../../settings';
 import { Checkout } from '../checkout/checkout';
 import { LoginPage } from '../login/login';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

  cartItems: any[] = [];
  total: number;
  showEmptyCartMessage: boolean = false;
  parentNavCtrl: NavController; 
  currency_symbol: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, private toastController: ToastController, public events: Events) {
    
    this.parentNavCtrl = this.navParams.get("navCtrl");

    this.total = 0.0;
    this.currency_symbol = Settings.currency_symbol;
    
    this.storage.ready().then(()=>{

      this.storage.get("cart").then( (data)=>{
        this.cartItems = data;
        //console.log('cart items',this.cartItems);

        if(this.cartItems && this.cartItems.length > 0){

          this.cartItems.forEach( (item, index)=> {
            if(!item.variation){


              this.total = this.total + (item.product.price * item.qty);
              console.log(item.product.price * item.qty)

            }
            else{
              this.total = this.total + (parseFloat(item.variation.price) * item.qty);
              console.log(parseFloat(item.variation.price) * item.qty)
            }
          })

        } else {

          this.showEmptyCartMessage = true;

        }


      })

    })

  }

  removeFromCart(item, i){

    let price;
    
    if(!item.variation)
      price = item.product.price;
    else
      price = parseFloat(item.variation.price);
    let qty = item.qty;

    this.cartItems.splice(i, 1);

    this.storage.set("cart", this.cartItems).then( ()=> {

      this.total = this.total - (price * qty);

    });

    if(this.cartItems.length == 0){
      this.showEmptyCartMessage = true;
    }

    this.events.publish("updateCart");
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  checkout(){

    this.storage.get("cart").then( (data)=>{
        this.cartItems = data;

        //FIX: Prevent checkout if cart is empty
        if(this.cartItems && this.cartItems.length > 0){
          this.storage.get("userLoginInfo").then( (data) => {

           // data=null;
            if(data != null){
              
         
              this.navCtrl.push(Checkout);

            } else {
              this.navCtrl.push(LoginPage, { next: 'Checkout', navCtrl: this.navCtrl })
            }

            this.viewCtrl.dismiss();
          })
        } else {
          this.toastController.create({
            message: "Cart is empty",
            duration: 2000,
            showCloseButton: true
          }).present();
        }
    });
    

  }

  changeQty(item: any, index: number, change: number){

    let price;
    
    if(!item.variation)
      price = item.product.price;
    else
      price = parseFloat(item.variation.price);
      
    let qty: number = item.qty;

    if(change < 0 && item.qty == 1){
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;
    

    this.cartItems[index] = item;
    
    this.storage.set("cart", this.cartItems).then( ()=> {

      this.toastController.create({
        message: "Cart Updated.",
        duration: 2000,
        showCloseButton: true
      }).present();

    });
    
    
    this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));

  }

}
