import { Component, Injectable } from '@angular/core';
// import {Location} from '@angular/common';
import {ModalController, IonicPage, NavController, NavParams, ToastController, AlertController, Events, LoadingController } from 'ionic-angular';
import { Http,  Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Settings } from '../../settings';
import { SignupPage} from '../signup/signup';
import { HomePage } from "../home/home";



@Injectable()
@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  showFacebookLogin: boolean = false;
 apiUrl: string = Settings.store_url + "/index.php?option=com_jbackend&view=request&action=post&module=user&resource=login&username=proga100&password=elcana&api_key="+Settings.jbackend_api_key;
 posts:{};

  constructor(public navCtrl: NavController, public navParams: NavParams,
   //  private _location: Location,

    //public http: Http,
        public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, 
    private events: Events, private loadingController: LoadingController,public modalCtrl: ModalController,private https: HttpClient, public http: Http) {

    this.username = "";
    this.password = "";
   // this.getData();
    console.log(this.posts);
   // this.showFacebookLogin = Settings.facebook_login;

  }

  getData() {
    console.log(this.apiUrl);
    this.https.get(this.apiUrl).subscribe(res => {
     console.log(res);
    });
  }

  login() {

    
    let headers = new HttpHeaders();
    headers.append('Api-User-Agent', 'Example/1.0');
    headers.append(    'Authorization', 'my-token');
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    let apiUrl: string = Settings.store_url + "/index.php?option=com_jbackend&view=request&action=post&module=user&resource=login&username=" + this.username + "&password=" + this.password+"&api_key="+Settings.jbackend_api_key;

    let loading = this.loadingController.create();

  // console.log(headers);
//loading.present();
  
    this.https.get(apiUrl,{ headers: headers, observe: 'response' }) 
    .subscribe((res) => {
      //  console.log(res.json());
    
     //   console.log ('header',res.headers.get('Connection'));
     //  console.log ('header',res.body);
        let response = res.body;
       // alert(response['error_description']);
      //return;
       //console.log(response.error_code);return;

        if (response['error_code']) {
          this.toastCtrl.create({
            message: response['error_description'],
            duration: 5000
          }).present();

          loading.dismiss();
          return;
        }


        this.storage.set("userLoginInfo", response).then((data) => {
          
          this.alertCtrl.create({
            title: "Login Successful",
            message: "You have been logged in successfully.",
            buttons: [{
              text: "OK",
              handler: () => {

                this.events.publish("user:loggedIn");
            loading.dismiss();
        
                     
                        this.navCtrl.setRoot(HomePage);
                
                if (this.navParams.get("next")) {
                  this.navCtrl.setRoot(HomePage);
                } else {
                  this.navCtrl.setRoot(HomePage);
                }
              }
            }]
          }).present();
        })
      }, (err) => {
        loading.dismiss();
        this.toastCtrl.create({
            message: "An error occurred.",
            duration: 5000
          }).present();
      });
  
     }

  goToSignup() {
    this.navCtrl.push(SignupPage);
  }



  protected handleError (error: Response | any) {
    // Todo: Log the error   
    // Errors will be handled uniquely by the component that triggered them
    return Observable.throw(error);
} 
  
/*
  loginWithFacebook() {
    this.fb.login(["email"]).then((loginResponse) => {
      let loading = this.loadingController.create({
        content: 'Logging in with Facebook'
      });
      loading.present();

      this.http.get(Settings.store_url + "/api/user/fb_connect/?access_token=" + loginResponse.authResponse.accessToken + "&insecure=cool")
        .subscribe((response) => {
          //alert(JSON.stringify(response.json()))

          this.http.get(Settings.store_url + "/api/auth/get_currentuserinfo/?cookie=" + response.json().cookie + "&insecure=cool")
            .subscribe((r) => {

              let response = r.json();

              if (response.error) {
                this.toastCtrl.create({
                  message: response.error,
                  duration: 5000
                }).present();

                loading.dismiss();
                return;
              }

              this.storage.set("userLoginInfo", response).then((data) => {

                this.alertCtrl.create({
                  title: "Login Successful",
                  message: "You have been logged in successfully.",
                  buttons: [{
                    text: "OK",
                    handler: () => {

                      this.events.publish("user:loggedIn");
                      loading.dismiss();

                      if (this.navParams.get("next")) {
                        this.navCtrl.push(this.navParams.get("next"));
                      } else {
                        this.navCtrl.setRoot('Menu');
                      }
                    }
                  }]
                }).present();
              })

            })

        },
        (error) => {
          alert(JSON.stringify(error));
        });
    })
  }

  */

  retrievePassword() {
    let ale = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "We will send you an email with the link to recover/reset your password.",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Retrieve',
          handler: data => {
            if(data.username.length > 0){
              /*
              this.http.get(Settings.store_url + "/api/user/retrieve_password/?insecure=cool&user_login=" + data.username).subscribe((r) => {
                let res = r.json();

                if(res.status == "error"){
                  alert(res.error);
                }

                if(res.status == "ok"){
                  alert(res.msg);
                }

              })
              */
            }
          }
        }
      ]
    });
    ale.present();
  }

}
