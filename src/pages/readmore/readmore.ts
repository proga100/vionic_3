import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController  } from 'ionic-angular';


/**
 * Generated class for the ReadmorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-readmore',
  templateUrl: 'readmore.html',
})
export class ReadmorePage {
  public prod_id; 
  
 

  product: any={};
  pr: any[];
  par: any;
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, 
    // private wooProvider: WooCommerceProvider
  ) {
    this.product= navParams.get('product');
    //Create loading
this.loading = this.loadingCtrl.create();




 this.ReadmorePage();

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadmorePage');
  }

  ReadmorePage(){

console.log('read',this.product);

  }

}
