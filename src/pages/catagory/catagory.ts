import { Component } from '@angular/core';
import { ModalController, AlertController ,NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { LoadingController } from 'ionic-angular';
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
	 WooCommerce: any;
  testRadioOpen: boolean;
  testRadioResult;
  catagory:any[];
  subcategory:any[];
  products: any[];
  pr: any[];
  par: any;


 constructor(public navCtrl: NavController,public loading: LoadingController,public navParams: NavParams, public alertCtrl: AlertController,public modalCtrl: ModalController) {
 this.catagory = navParams.data;
 	this.subcategory = this.catagory['children'];
	
	 this.WooCommerce = WC({
      url: 'https://www.cisupplystore.com/newvm',
      consumerKey: 'sdgfsdg',
      consumerSecret: 'erherht'
    });
	/*
	this.WooCommerce.getmeAsync("type=products_by_category&category_id="+this.subcategory['virtuemartCategoryId']).then((data) => {
	this.par = JSON.parse(data.body);
	//console.log(this.par.data);
	this.products = this.par.data[0];
	 console.log( this.products);
	
    }).catch((err) => {
      alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
    })
	
	*/
	
	  let loader = this.loading.create({
    content: 'Getting latest entries...',
  });
  

	   loader.present().then(() => {
   this.WooCommerce.getmeAsync("type=products_by_category&category_id="+this.subcategory['virtuemartCategoryId']).then((data) => {
	this.par = JSON.parse(data.body);
	//console.log(this.par.data);
	this.products = this.par.data[0];
	 console.log( this.products);
	
    }).catch((err) => {
      alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
    })
	
    loader.dismiss();
  });
	

  }
 

  

  ionViewDidLoad() {
	 

  
	
    console.log('ionViewDidLoad CatagoryPage');
  }
      ProductDeatail(){
      this.navCtrl.push(ProductdetailsPage);
  }
     hold() {
     let modal = this.modalCtrl.create(HoldComponent);
      modal.present(); 
     }

    CatagoryList(){
     this.navCtrl.push(CatagorylistPage);
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
