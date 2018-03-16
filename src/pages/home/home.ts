import { Component } from '@angular/core';
import {  NavController, Slides, ToastController, ModalController,  LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
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
  private loading: any;
  

  
  constructor(public navCtrl: NavController,
    private wooProvider: WooCommerceProvider,
    public storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    //Create loading
    this.loading = this.loadingCtrl.create();
	
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
      //Show Loading
      this.loading.present();
     
    this.categories = [];
	   
	 
    this.wooCommerce.getmeAsync("type=categories&category_id=0").then((data) => {
           //Hide loading
           this.loading.dismiss();
    let temp: any[] = JSON.parse(data.body).data[0]['children'];

    for( let i = 0; i < temp.length; i ++){
 
        this.categories.push(temp[i]);
      
    }

  }, (err)=> {
       //Hide loading
       this.loading.dismiss();
    console.log(err);
  })

  
//console.log('categories', this.categories);  


  
}

    
  }


