import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController, ViewController,LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InfoComponent } from '../../components/info/info';
import { ProductdetailsPage } from '../../pages/productdetails/productdetails';
import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
import { Cart } from '../../pages/cart/cart';

@Component({
  selector: 'page-compareitems',
  templateUrl: 'compareitems.html',
})
export class CompareitemsPage {
  private loading: any;
  private wooCommerce: any;
public product_ids: any;
public products:any;
public par: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController, private wooProvider: WooCommerceProvider
  ) {

    this.loading = this.loadingCtrl.create();
	
    this.wooCommerce = wooProvider.WooCommerce;
  
  //  this.infoModal();
    this.products_compare();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompareitemsPage');
  }
  infoModal() {
 //  let modal = this.modalCtrl.create(InfoComponent);
  //  modal.present();
  }

    productDetails(){
    this.navCtrl.push(ProductdetailsPage);
  }

  Prod(prod_id){  
    this.navCtrl.push(ProductdetailsPage,
   { prod_id: prod_id  }   );
    
  }

    products_compare(){
  this.storage.get("compare").then((data) => {
    if (data == undefined || data.length == 0) {
     
    }else{
      this.product_ids = data;
      let str= '';
  for (let u=0; u<data.length; u++){

    str+='&product_ids[]='+data[u];


  }

    this.loading = this.loadingCtrl.create();

    this.loading.present();
    this.wooCommerce.getmeAsync("type=products_by_ids"+str).then((data) => {
      //Show Loading
    //Create loading
    
      this.loading.dismiss();
     this.par = JSON.parse(data.body);
    
     this.products = this.par.data[0];
      //console.log( this.product);

      this.loading.dismiss();
      return;
     
       }).catch((err) => {
        this.loading.dismiss();
         alert("There was an error connecting to the server at the moment. We are working on it. Please try again later.")
       })
    }
   
  })

  console.log ('prod_ids',this.product_ids);

}

cart(){
  this.navCtrl.push(Cart);


}
}
