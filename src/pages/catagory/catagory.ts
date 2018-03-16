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
  category: any;
  categories: any[];
  subcs:any[]; 
  products: any[];
  pr: any[];
  par: any;
  private loading: any;
  private loading_1: any;



 constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, private wooProvider: WooCommerceProvider,public navParams: NavParams, public alertCtrl: AlertController,public modalCtrl: ModalController) {
 this.catagory = navParams.data;
   this.subcategory = this.catagory['children'];

   console.log(this.subcategory);
   //Create loading
   this.loading = this.loadingCtrl.create();
  
	
   this.wooCommerce = wooProvider.WooCommerce;
	
   
   //Load more products
   if (this.wooCommerce) {
    this.LoadSubCats(this.catagory['virtuemartCategoryId']);
  }
	
		

  }
 LoadSubCats(cat_id){
  this.loading.present();
  this.wooCommerce.getmeAsync("type=products_by_category&category_id="+cat_id).then((data) => {
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


 subcatsme(sub_catid){
  this.loading = this.loadingCtrl.create();
  
  this.loading.present();

 this.LoadSubCats(sub_catid);
  this.subcs = [];
 
 
	 
  this.wooCommerce.getmeAsync("type=categories&category_id="+sub_catid).then((data) => {
         //Hide loading
         this.loading.dismiss();
  let temp: any[] = JSON.parse(data.body).data[0]['children'];

  for( let i = 0; i < temp.length; i ++){

    this.subcs.push(temp[i]);
    
  }
console.log('sub',this.subcs);
}, (err)=> {
     //Hide loading
     this.loading_1.dismiss();
  console.log(err);
})
 

 }

 
 onSegmentChanged($event){

 this.subcatsme($event._value); // subcategories names


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
