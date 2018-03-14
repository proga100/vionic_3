import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { Storage } from '@ionic/storage';
 import { WooCommerceProvider } from "../../providers/woocommerce/woocommerce";
// import { HomePage } from '../home/home';
// import { Menu } from '../menu/menu';
// import { OrderPlacedPage } from '../order-placed/order-placed';

import { Settings } from "../../settings";

declare var RazorpayCheckout: any;

@IonicPage({})
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
  private wooCommerce: any;
  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;
  customer: any = {};
  user_id;
  country: any;
  billing_state: any;
  shipping_state: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public alertCtrl: AlertController,
   //  public payPal: PayPal,
      private loadingController: LoadingController, 
  //    public iab: InAppBrowser, 
      private http: Http,
      private wooProvider: WooCommerceProvider,
       public toastCtrl: ToastController )
        {
          this.countries();    
    let loading = this.loadingController.create();

    loading.present();
   
    // this.stripeNode = stripePackage(Settings.stripe_publishable_key);

    this.newOrder = {};
    this.newOrder.billing = {};
    this.newOrder.shipping = {};
    this.billing_shipping_same = false;

   this.newOrder.billing.country = "223";
    this.newOrder.billing.state = "1";
    this.newOrder.shipping.state = "1";
    this.newOrder.shipping.country = "223";
    this.setBillingState(this.newOrder.billing.country); 
    this.setShippingState(this.newOrder.shipping.country);

    this.paymentMethods = [];

    if (Settings.bacs_enabled)
      this.paymentMethods.push({ method_id: "bacs", method_title: "Direct Bank Transfer" });
    if (Settings.cheque_enabled)
      this.paymentMethods.push({ method_id: "cheque", method_title: "Cheque Payment" });
    if (Settings.cod_enabled)
      this.paymentMethods.push({ method_id: "cod", method_title: "Cash on Delivery" });
  /*
      if (Settings.paypal_enabled)
      this.paymentMethods.push({ method_id: "paypal", method_title: "PayPal" });
    if (Settings.razorpay_enabled)
      this.paymentMethods.push({ method_id: "razorpay", method_title: "RazorPay" });
    if (Settings.payumoney_enabled)
    this.paymentMethods.push({ method_id: "payumoney", method_title: "PayUMoney" });
*/


    this.wooCommerce = wooProvider.WooCommerce;

    this.storage.get("userLoginInfo").then((userLoginInfo) => {
   
      loading.present();
     // let id = userLoginInfo.userid;
    //  userLoginInfo = null;
      if(userLoginInfo != null){
     
 
      this.http.get(Settings.store_url + "/index.php?option=com_jbackend&view=request&action=get&module=user&resource=profile&api_key="+Settings.jbackend_api_key) 
      .subscribe((res) => {
          
   
          let response = res.json();
       //   alert(response.error_code);
          let user_info = response;

    //  
   // console.log(response); 

   
    
          if (response['error_code']) {
            this.toastCtrl.create({
              message: response['error_description'],
              duration: 5000
            }).present();
    
            loading.dismiss();
            return;
          }
         

           let customer_info =response['fields'][0];
           this.newOrder.last_name = customer_info.last_name;
          this.newOrder.first_name = customer_info.first_name;
           this.newOrder.email = user_info['email'];
          this.newOrder.username =  user_info['username'];
          
          this.newOrder.billing.first_name = customer_info.first_name;
          this.newOrder.billing.last_name=customer_info.last_name;
       
           this.newOrder.billing.address_1=customer_info.address_1;
           this.newOrder.billing.address_2=customer_info.address_2;
           this.newOrder.billing.city=customer_info.city;
           this.newOrder.billing.state=customer_info.state;
           this.newOrder.billing.zip=customer_info.zip;
          

       console.log('cou', this.country);
          
            this.newOrder.billing.phone=customer_info.phone_1;

            this.newOrder.shipping.first_name=customer_info.first_name;
            this.newOrder.shipping.last_name=customer_info.last_name;
            this.newOrder.shipping.address_1=customer_info.address_1;
            this.newOrder.shipping.address_2=customer_info.address_2;
            this.newOrder.shipping.city=customer_info.city;
            this.newOrder.shipping.state=customer_info.state;
            this.newOrder.shipping.zip=customer_info.zip;
           

          //  this.newOrder.shipping.country=country ;
    
            
    
            loading.dismiss();
    
        
        }, (err) => {
          loading.dismiss();
          this.toastCtrl.create({
              message: "An error occurred.",
              duration: 5000
            }).present();
        });
      }
      else {
       
        loading.dismiss();
        this.toastCtrl.create({
          message: "No user found.",
          duration: 5000
        }).present();
      }

    })

  }


countries(){


  this.http.get(Settings.store_url + "/index.php?option=com_ajax&plugin=vprodbycat&format=json&type=countries") 
  .subscribe((res) => {
      let response = res.json();

      this.country = response.data[0];

      if (response['error_code']) {
        this.toastCtrl.create({
          message: response['error_description'],
          duration: 5000
        }).present();

        return;
      }
     
      //  console.log(country);


    
    }, (err) => {

      this.toastCtrl.create({
          message: "An error occurred.",
          duration: 5000
        }).present();
    });

  
}
  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping = this.newOrder.billing;
    }

  }


  // filling states selects

setShippingState(country_id){

 

  this.http.get(Settings.store_url + "/index.php?option=com_virtuemart&view=state&format=json&virtuemart_country_id="+country_id) 
  .subscribe((res) => {
      let response = res.json();

      this.shipping_state = response[country_id];
 console.log(this.shipping_state);


    
    }, (err) => {

      this.toastCtrl.create({
          message: "An error occurred.",
          duration: 5000
        }).present();
    });

  
  }
// filling states selects

setBillingState(country_id){

 

  this.http.get(Settings.store_url + "/index.php?option=com_virtuemart&view=state&format=json&virtuemart_country_id="+country_id) 
  .subscribe((res) => {
      let response = res.json();

      this.billing_state = response[country_id];
 console.log(this.billing_state);


    
    }, (err) => {

      this.toastCtrl.create({
          message: "An error occurred.",
          duration: 5000
        }).present();
    });

  
  }
  placeOrder() {


    if(this.paymentMethod == undefined){
      this.toastCtrl.create({
        message: "Please select a payment mode.",
        duration: 2000
      }).present().then(() => {
        return;
      })
      return;
    }


    let loading = this.loadingController.create();
    loading.present();

    let orderItems: any[] = [];
    let data: any = {};

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });


    data = {
      payment_method: paymentData.method_id,
      payment_method_title: paymentData.method_title,
      set_paid: true,

      billing: this.newOrder.billing,
      shipping: this.newOrder.shipping,
    //  customer_id: this.userInfo.id || '',
      line_items: orderItems
    };


    if (paymentData.method_id == "paypal") {
        /*
      this.payPal.init({
        PayPalEnvironmentProduction: Settings.paypal_production_key,
        PayPalEnvironmentSandbox: Settings.paypal_sandbox_key
      }).then(() => {

        this.payPal.prepareToRender(Settings.paypal_env[Settings.paypal_env_enabled], new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {

          this.storage.get("cart").then((cart) => {

            let total = 0.00;
            cart.forEach((element, index) => {
              if (element.variation) {
                // let variations: any = {};

                // for (let i = 0; i < element.variation.attributes.length; i++) {
                //   let slug = element.variation.attributes[i].slug;
                //   let option = element.variation.attributes[i].option;
                //   variations["pa_" + slug] = option;
                // }

                orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                total = total + (element.variation.price * element.qty);
              }
              else {
                orderItems.push({ product_id: element.product.id, quantity: element.qty });
                total = total + (element.product.price * element.qty);
              }
            });

            let payment = new PayPalPayment(total.toString(), 'USD', 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((response) => {
              // Successfully paid

              alert(JSON.stringify(response));


              data.line_items = orderItems;
              //console.log(data);
              let orderData: any = {};

              orderData.order = data;

              this.WooCommerce.postAsync('orders', orderData).then((data) => {
                alert("Order placed successfully!");

                let response = (JSON.parse(data.body).order);

                // this.alertCtrl.create({
                //   title: "Order Placed Successfully",
                //   message: "Your order has been placed successfully. Your order number is " + response.order_number,
                //   buttons: [{
                //     text: "OK",
                //     handler: () => {
                //       this.navCtrl.setRoot(HomePage);
                //     }
                //   }]
                // }).present();
                loading.dismiss();

                this.navCtrl.push('OrderPlacedPage', { orderNumber: response.order_number });

              })

            })

          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });

      */
    } else if (paymentData.method_id == "razorpay") {

      this.storage.get("cart").then((cart) => {

        let total = 0.00;
        cart.forEach((element, index) => {
          if (element.variation) {
            // let variations: any = {};

            // for (let i = 0; i < element.variation.attributes.length; i++) {
            //   let slug = element.variation.attributes[i].slug;
            //   let option = element.variation.attributes[i].option;
            //   variations["pa_" + slug] = option;
            // }

            orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
            total = total + (element.variation.price * element.qty);
          }
          else {
            orderItems.push({ product_id: element.product.id, quantity: element.qty });
            total = total + (element.product.price * element.qty);
          }
        });

        let options = {
          description: 'Payment to CIS',
          image: 'https://www.cisupplystore.com/newvm/images/bbbcentral-industrial-supplybw.png',
          currency: 'USD',
          key: Settings.razorpay_key,
          //order_id: 'order_7HtFNLS98dSj8x',
          amount: (total * 100).toString(),
          name: 'CIS',
          prefill: {
            email: this.newOrder.email,
            contact: this.newOrder.billing_address.phone,
            name: this.newOrder.first_name + " " + this.newOrder.last_name
          },
          theme: {
            color: '#F37254'
          }
        }

        var successCallback = (success) => {
          alert(JSON.stringify(success))
/*
          var orderId = success.razorpay_order_id
          var signature = success.razorpay_signature
*/
          data.line_items = orderItems;
          //console.log(data);
          let orderData: any = {};

          orderData.order = data;

          this.wooCommerce.postAsync('type=orders', orderData).then((data) => {
            alert("Order placed successfully!");

            let response = (JSON.parse(data.body).order);

            // this.alertCtrl.create({
            //   title: "Order Placed Successfully",
            //   message: "Your order has been placed successfully. Your order number is " + response.order_number,
            //   buttons: [{
            //     text: "OK",
            //     handler: () => {
            //       this.navCtrl.setRoot(HomePage);
            //     }
            //   }]
            // }).present();
            loading.dismiss();
            this.navCtrl.push('OrderPlacedPage', { orderNumber: response.order_number });
          })


        }

        var cancelCallback = (error) => {
          alert(error.description + ' (Error ' + error.code + ')')
        }

        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)

        RazorpayCheckout.open(options, successCallback, cancelCallback)
      });
    } else if (paymentData.method_id == "payumoney"){
      this.storage.get("cart").then((cart) => {

        let total = 0.00;
        cart.forEach((element, index) => {
          if (element.variation) {
            // let variations: any = {};

            // for (let i = 0; i < element.variation.attributes.length; i++) {
            //   let slug = element.variation.attributes[i].slug;
            //   let option = element.variation.attributes[i].option;
            //   variations["pa_" + slug] = option;
            // }

            orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
            total = total + (element.variation.price * element.qty);
          }
          else {
            orderItems.push({ product_id: element.product.id, quantity: element.qty });
            total = total + (element.product.price * element.qty);
          }
        });

        data.line_items = orderItems;
        loading.dismiss();

    //    this.makePaymentViaPayUMoney(data, total)



      });
    }
    else {

      this.storage.get("cart").then((cart) => {

        cart.forEach((element, index) => {
          if (element.variation) {

            orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
            //total = total + (element.variation.price * element.qty);
          }
          else {
            orderItems.push({ product_id: element.product.id, quantity: element.qty });
            //total = total + (element.product.price * element.qty);
          }
        });

        data.line_items = orderItems;

        let orderData: any = {};

        orderData.order = data;
        console.log(orderData)

        this.wooCommerce.postAsync("type=orders", orderData.order).then((data) => {

          let response = (JSON.parse(data.body));
          console.log(response)
          // this.alertCtrl.create({
          //   title: "Order Placed Successfully",
          //   message: "Your order has been placed successfully. Your order number is " + response.order_number,
          //   buttons: [{
          //     text: "OK",
          //     handler: () => {
          //       this.navCtrl.setRoot(HomePage);
          //     }
          //   }]
          // }).present();
          loading.dismiss();
          this.navCtrl.push('OrderPlacedPage', { orderNumber: response.number });

        })

      })

    }


  }

  makePaymentViaPayUMoney(data, total){

    let loading = this.loadingController.create();
    loading.present();

    let headers = new Headers();
    //headers.append("Authorization", "KpNTiy57L6OFjS2D3TqPod8+6nfGmRVwVMi5t9jR4NU="); Test Header
    headers.append("Authorization", Settings.payumoney_header);
    headers.append("cache-control", "no-cache");

    this.http.post(Settings.payumoney_url + "/payment/payment/addInvoiceMerchantAPI?amount=" + total + "&transactionId=" + Date.now() + "&paymentDescription=WooIonic_Purchase&customerName=" + this.newOrder.first_name + "&customerEmail=" + this.newOrder.email + "&customerPhone=" + this.newOrder.billing_address.phone, {}, { "headers": headers }).subscribe((response) => {
      alert(JSON.stringify(response.json()));

      let res = response.json();

      if(res.errorCode){
        alert("An error occurred!");
        loading.dismiss();
        return;
      }

   //   let payment_url = res.result.paymentURL;
/*
      let iab = this.iab.create(payment_url);
      iab.on("exit").subscribe((event) => {
        alert("You cancelled the payment. Your order is not placed.");
        loading.dismiss();
      })
      iab.on('loadstart').subscribe((event) => { 
        if(event.url.indexOf("success") >= 0){
          
          iab.hide();

          let orderData: any = {};

          orderData.order = data;

          this.WooCommerce.postAsync("orders", orderData).then((data) => {

            let response = (JSON.parse(data.body).order);
            loading.dismiss();
            this.navCtrl.push('OrderPlacedPage', { orderNumber: response.order_number });

          })
        } else if(event.url.indexOf("failure") >= 0){
          
          iab.hide();
          loading.dismiss();
          alert("Payment was unsuccesssful. You order could not be placed.");
        }
      });
      */

    })
  }

}
