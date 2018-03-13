import { Component } from '@angular/core';
import { ModalController, AlertController ,NavController, NavParams, LoadingController } from 'ionic-angular';
import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
import { ProductdetailsPage } from '../../pages/productdetails/productdetails';
import { HoldComponent } from '../../components/hold/hold';
import { CatagorylistPage } from '../../pages/catagorylist/catagorylist';
import { SortComponent } from '../../components/sort/sort';
import { FillterComponent } from '../../components/fillter/fillter';


/**
 * Generated class for the CatagoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-catagory',
  templateUrl: 'catagory.html',
})
export class CatagoryPage {
  private wooCommerce: any;
  testRadioOpen: boolean;
  testRadioResult;
  catagory:any[];
  subcategory:any[];
  products: any[];
  pr: any[];
  par: any;
  private loading: any;


 constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, private wooProvider: WooCommerceProvider,public navParams: NavParams, public alertCtrl: AlertController,public modalCtrl: ModalController) {
 this.catagory = navParams.data;
   this.subcategory = this.catagory['children'];
   //Create loading
   this.loading = this.loadingCtrl.create();
	
   this.wooCommerce = wooProvider.WooCommerce;
	
   
   //Load more products
   if (this.wooCommerce) {
    this.LoadSubCats();
  }
	
		

  }
 LoadSubCats(){
  this.loading.present();
  this.wooCommerce.getmeAsync("type=products_by_category&category_id="+this.catagory['virtuemartCategoryId']).then((data) => {
    //Show Loading

    this.loading.dismiss();
   this.par = JSON.parse(data.body);
  
   this.products = this.par.data[0];
   // console.log( this.products);
   
     }).catch((err) => {
      this.loading.dismiss();
       alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
     })
   
  



 }

 onSegmentChanged($event){
  this.loading = this.loadingCtrl.create();

this.loading.present();
this.wooCommerce.getmeAsync("type=products_by_category&category_id="+$event._value).then((data) => {
  //Show Loading
//Create loading

  this.loading.dismiss();
 this.par = JSON.parse(data.body);

 this.products = this.par.data[0];
 // console.log( this.products);
 
   }).catch((err) => {
    this.loading.dismiss();
     alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
   })
 


 }

  

  ionViewDidLoad() {
	 

  
	
   // console.log('ionViewDidLoad CatagoryPage');
  }


     hold() {
     let modal = this.modalCtrl.create(HoldComponent);
      modal.present(); 
     }

    CatagoryList(){
     this.navCtrl.push(CatagorylistPage);
  }

  Prod(prod_id){
  
   this.navCtrl.push(ProductdetailsPage,
  {
prod_id: prod_id

  }
  );
   
 }
    sort() {
    let modal = this.modalCtrl.create(SortComponent);
    modal.present();
  }
    fillter() {
    let modal = this.modalCtrl.create(FillterComponent);
    modal.present();
  }
  
}
