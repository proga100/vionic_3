import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,ModalController,Events, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ThambnailPage } from '../../pages/thambnail/thambnail';
import { SizeComponent } from '../../components/size/size';
import { QuantityComponent } from '../../components/quantity/quantity';
import { ReadmorePage } from '../../pages/readmore/readmore';
import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
import { Cart } from '../../pages/cart/cart';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  public prod_id; 
  private wooCommerce: any;
  selectedOptions: any = {};
  selectedVariation: any;
  productPrice: number = 0.0;  
  productVariations: any[] = [];

  product: any={};
  pr: any[];
  par: any;
  private loading: any;

  qty:any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public storage: Storage,
    public events: Events,
    public loadingCtrl: LoadingController, private wooProvider: WooCommerceProvider,
    public modalCtrl: ModalController
   ) {

    this.prod_id = navParams.get('prod_id');
       //Create loading
   this.loading = this.loadingCtrl.create();
   this.qty =1;
	
   this.wooCommerce = wooProvider.WooCommerce;
	 storage.set('name', 'Max');
   
   //Load more products
   if (this.wooCommerce) {
    this.ProductdetailsPage();
  }

  }

  ionViewDidLoad() {


    console.log('ionViewDidLoad ProductdetailsPage');
  }

  ProductdetailsPage(){


    this.loading = this.loadingCtrl.create();

    this.loading.present();
    this.wooCommerce.getmeAsync("type=products_by_id&product_id="+this.prod_id).then((data) => {
      //Show Loading
    //Create loading
    
      this.loading.dismiss();
     this.par = JSON.parse(data.body);
    
     this.product = this.par.data[0];
      //console.log( this.product);
      return;
     
       }).catch((err) => {
        this.loading.dismiss();
         alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
       })
     
    

  }
  thambnail(){
     this.navCtrl.push(ThambnailPage);
  }
  size() {
  let modal = this.modalCtrl.create(SizeComponent);
   modal.present(); 
  }
  quantity() {
    let qt = '';
  let modal = this.modalCtrl.create(QuantityComponent);
  let qs = modal.onDidDismiss(data => {
    // Do things with data coming from modal, for instance :
   
    this.qty = data;
   
return data;
});


console.log(this.qty);
   modal.present(); 
  }
  readMore(){
     this.navCtrl.push(ReadmorePage,
      {
        product:  this.product
        
          }
    );
  }
  
  addToCart() {
let product = this.product;


product.id = this.product['virtuemart_product_id'];
product.reg_price =  this.product['reg_price'];
product.price =  this.product['reg_price'];

console.log(product);


    //counting selected attribute options
    let count = 0;
    /*
    for (let k in this.selectedOptions) if (this.selectedOptions.hasOwnProperty(k)) count++;

    //counting variation attributes options
    let count_ = 0;
    for (var index = 0; index < this.product.attributes.length; index++) {
      
      if(this.product.attributes[index].variation)
        count_++;
      
    }
    */

    //checking if user selected all the variation options or not
    /*
    if(count_ != count || this.requireOptions)
    {
      this.toastCtrl.create({
        message: "Select Product Options",
        duration: 2000,
        showCloseButton: true
      }).present();
      return; 
    }
*/




    this.storage.get("cart").then((data) => {
     
      if (data == undefined || data.length == 0) {
        data = [];

        data.push({
          "product": product,
          "qty": this.qty,
          "amount": parseFloat(product.price)
        });

          /*
        if(this.selectedVariation){
          data[0].variation = this.selectedVariation;
          data[0].amount = parseFloat(this.selectedVariation.price);
        }
        */

      } else {

        let alreadyAdded = false;
        let alreadyAddedIndex = -1;

        for (let i = 0; i < data.length; i++){
          if(data[i].product.id == product.id){ //Product ID matched

         
            if(this.productVariations.length > 0){ //Now match variation ID also if it exists
              if(data[i].variation.id == this.selectedVariation.id){
                alreadyAdded = true;
                alreadyAddedIndex = i;
                break;
              }
            } else { //product is simple product so variation does not  matter
              alreadyAdded = true;
              alreadyAddedIndex = i;
              break;
            }
            

          }
        }

        if(alreadyAdded == true){
          if(this.selectedVariation){
            data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + 1;
            data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + parseFloat(this.selectedVariation.price);
            data[alreadyAddedIndex].variation = this.selectedVariation;
          } else {
            data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + 1;
            data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + parseFloat(data[alreadyAddedIndex].product.price);
          } 
        } else {
          if(this.selectedVariation){
            data.push({
              product: product,
              qty: this.qty,
              amount: parseFloat(this.selectedVariation.price),
              variation: this.selectedVariation
            })
          } else {
            data.push({
              product: product,
              qty: this.qty ,
              amount: parseFloat(product.price)
            })
          }
        }

      }
      
      this.storage.set("cart", data).then(() => {
     
        
        this.events.publish("updateCart");

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

     

      })

      
      this.navCtrl.push(Cart);

    })

  }

 
}
