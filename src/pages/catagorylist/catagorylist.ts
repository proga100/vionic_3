import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
import { CompareitemsPage } from '../../pages/compareitems/compareitems';
/**
 * Generated class for the CatagorylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-catagorylist',
  templateUrl: 'catagorylist.html',
})
export class CatagorylistPage {
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
   data:any;
  com_pro: any;
  compareitems: any;
  product_info:any[];



  constructor(public navCtrl: NavController, public navParams: NavParams, 
    
    public storage: Storage,
    public modalCtrl: ModalController) {

    this.products = navParams.get('products');
 this.subcategory= navParams.get('subcategory');
 this.subcs = navParams.get('subcs');
  this.initial_sel();
    
    this.storage.get("compare").then((data) => {
      if (data == undefined || data.length == 0) {
        this.com_pro = 0;
      }else{
        this.com_pro = data.length;
      }
     
    })

   // this.product_info_get();

  }

  product_info_get(){
    let product_info = [];
    for (let k = 0; k < this.products.length; k++){
      let key = this.products[k].virtuemart_product_id;
     product_info[key] = this.products[k];

    }
   this.product_info =  product_info;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatagorylistPage');
  }
     compareItems(){
     this.navCtrl.push(CompareitemsPage);
  }
  compare(product_id){
    let myDiv = document.getElementById(product_id);
   
    if ( myDiv.style.display == 'none'){
   myDiv.style.display = 'block';

    this.addToCompare(product_id);
    }else if(myDiv.style.display == 'block'){
    myDiv.style.display = 'none';
    this.RemoveCompare(product_id);

    }

  }
  RemoveCompare(product_id){
    this.storage.get("compare").then( (data)=>{
    
    if (data == undefined || data.length == 0) {
      data = [];

    } else {
   
      for (let i = 0; i < data.length; i++){
        if(data[i] == product_id){  
         data.splice(i, 1);

        }
        
      }
      if (data.length == 0) {

        this.com_pro= 0;
      }else{this.com_pro= data.length;}

      console.log('d_rem',data);

      
      console.log('co', this.com_pro);
      this.storage.set("compare", data).then( ()=> { });
      
     
    }
 
    })
  
  }

  get_product_details(data){
    let products_din= [];
    for (let k = 0; k < this.data.length; k++){
      products_din[this.data[k]]= this.product_info[this.data[k]];
    }

    this.storage.set("get_product_details", this.removeDuplicateUsingFilter(data)).then(() => {  })

  }
  addToCompare(product_id) {

        this.storage.get("compare").then((data) => {
          console.log('compare data',  data);
          if (data == undefined || data.length == 0) {
            data = [];
            
           data.push(product_id);
         
           this.com_pro= 1;
            this.storage.set("compare", data ).then(() => { })
            console.log('data-nu',data);
            console.log('co', this.com_pro);
          } else {
         
            data.push( product_id);
            this.com_pro= data.length;
        
            console.log('co', this.com_pro);
            this.storage.set("compare", this.removeDuplicateUsingFilter(data)).then(() => {  })
           
    
          
          }
    
          })

          
    
         
    
        }

       removeDuplicateUsingFilter(arr){
        // console.log('arra',arr);
          let unique_array = arr.filter(function(elem, index, self) {
              return index == self.indexOf(elem);
          });

        //  console.log('uniq',unique_array );
          return unique_array
      }

      initial_sel(){
        this.storage.get("compare").then((data) => {
       
          if (data == undefined || data.length == 0) {
       
          
          } else {
            for (let k = 0; k < data.length; k++){
          
              let myDiv = document.getElementById(data[k]);

              if (myDiv !=null) myDiv.style.display = 'block';
                        
            }
          }
          })
         }
    
}
  

