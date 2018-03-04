//import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController, ModalController, Events, Platform } from 'ionic-angular';
//import { LoadingController } from 'ionic-angular';
import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
import { CatagoryPage } from '../../pages/catagory/catagory';
import { CatagorylistPage } from '../../pages/catagorylist/catagorylist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private wooCommerce: any;
  products: any[];
  pr: any[];
  par: any;
  category: any;
  categories: any[];
  moreProducts: any[];
  mainCategories: any[];
  page: number;
  images: string[] = [];
  

  
  constructor(public navCtrl: NavController,private wooProvider: WooCommerceProvider) {
	
    this.wooCommerce = wooProvider.WooCommerce;
       //Load more products
       if (this.wooCommerce) {
        this.loadCats();
      }
  }
  
  
    catagory(catagory){
		
		console.log('subcategory:',catagory);
     this.navCtrl.push(CatagoryPage,catagory );
  }

    CatagoryList(){
     this.navCtrl.push(CatagorylistPage);
  }
  loadCats() {
    this.categories = [];
	   
	

	
 	
    this.wooCommerce.getmeAsync("type=categories&category_id=0").then((data) => {

    let temp: any[] = JSON.parse(data.body).data[0]['children'];

    for( let i = 0; i < temp.length; i ++){
 
        this.categories.push(temp[i]);
      
    }

  }, (err)=> {
    console.log(err);
  })
  
console.log('fer', this.categories);  


  
}

    
  }


