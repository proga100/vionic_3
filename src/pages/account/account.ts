import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Settings } from '../../settings';
//import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
// import { ProductDetails } from "../product-details/product-details";
import { Storage } from '@ionic/storage';
//import { EditAccountModalPage } from "../edit-account-modal/edit-account-modal";


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  //private wooCommerce: any;
  username: string;
  password: string;
  user_id;
  customer: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private ngZone: NgZone, 
    private loadingController: LoadingController,  public toastCtrl: ToastController,
   // private wooProvider: WooCommerceProvider, 
   private events: Events, 
   
    public storage: Storage, private modalCtrl: ModalController, 
    private https: HttpClient,
    public http: Http) {
 
    this.customer.billing_address = {};
   this.customer.shipping_address = {};

   this.username = "";
   this.password = "";
    // get customer info

    this.getCustomerData();

   

  }



  getCustomerData(){
    let loading = this.loadingController.create();
    //loading.present();
    this.storage.ready().then( () => {
      this.storage.get("userLoginInfo").then( (userLoginInfo) => {
      //  console.log(userLoginInfo.userid);return;
        if(userLoginInfo != null){
          let username = userLoginInfo.username;
          this.storage.get("userLogin" ).then((userLogin)=>{

let password = userLogin[1];

this.login(username, password); 


          });
         // alert( this.user_id);
        }
        else {
          alert("No user found.");
        }
   
        this.http.get(Settings.store_url + "/index.php?option=com_jbackend&view=request&action=get&module=user&resource=profile&api_key="+Settings.jbackend_api_key) 
        .subscribe((res) => {
       //   alert( this.user_id);
          loading.dismiss();
     
            let response = res.json();
         //   alert(response.error_code);
            let user_info = response;
         let customer_info =response['fields'][0];
       //  console.log(customer_info);
     
            if (response['error_code']) {
              this.toastCtrl.create({
                message: response['error_description'],
                duration: 5000
              }).present();
      
              loading.dismiss();
              return;
            }

            this.ngZone.run(() => {
              this.customer['last_name'] = customer_info.last_name;
              this.customer['first_name'] = customer_info.first_name;
              this.customer['email'] = user_info['email'];
              this.customer['billing_address']['first_name'] =customer_info.first_name;
              this.customer['billing_address']['last_name']=customer_info.last_name;
              this.customer['billing_address']['address_1']=customer_info.address_1;
              this.customer['billing_address']['address_2']=customer_info.address_2;
              this.customer['billing_address']['city']=customer_info.city;
              this.customer['billing_address']['state']=customer_info.state;
              this.customer['billing_address']['postcode']=customer_info.zip;
              this.customer['billing_address']['country']='USA'
              this.customer['billing_address']['phone']=customer_info.phone_1;
              this.customer['shipping_address']['first_name']=customer_info.first_name;
              this.customer['shipping_address']['last_name']=customer_info.last_name;
              this.customer['shipping_address']['address_1']=customer_info.address_1;
              this.customer['shipping_address']['address_2']=customer_info.address_2;
              this.customer['shipping_address']['city']=customer_info.city;
              this.customer['shipping_address']['state']=customer_info.state;
              this.customer['shipping_address']['postcode']=customer_info.zip;
              this.customer['shipping_address']['country']='USA';
      
              console.log(this.customer);
              loading.dismiss();
            })
      
          
          }, (err) => {
            loading.dismiss();
            this.toastCtrl.create({
                message: "An error occurred.",
                duration: 5000
              }).present();
          });
      
         })
        

      })
    }
  



  showEditModal(){
    let modal = this.modalCtrl.create(//EditAccountModalPage,
       {"customer": this.customer});
    modal.onDidDismiss(data => {
     console.log(data);
     if(data.updated == true){
      this.getCustomerData();
     }
   });
    modal.present();
  }
  login(username, password) {

    
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append(    'Authorization', 'my-token');
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let apiUrl: string = Settings.store_url + "/index.php?option=com_jbackend&view=request&action=post&module=user&resource=login&username=" + username + "&password=" + password+"&api_key="+Settings.jbackend_api_key;

    let loading = this.loadingController.create();

 
    this.https.get(apiUrl,{ headers: headers, observe: 'response' }) 
    .subscribe((res) => {
     
        let response = res.body;
      
        if (response['error_code']) {
          this.toastCtrl.create({
            message: response['error_description'],
            duration: 5000
          }).present();

          loading.dismiss();
          return;
        }


        this.storage.set("userLoginInfo", response).then((data) => {
          this.events.publish("user:loggedIn");
         
        })
      }, (err) => {
        loading.dismiss();
        this.toastCtrl.create({
            message: "An error occurred.",
            duration: 5000
          }).present();
      });
  
     }




}
