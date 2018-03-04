import { Injectable } from '@angular/core';
declare var window;

@Injectable()
export class SettingsProvider {

  constructor() {
    
  }

  public async getFireBaseRemoteConfig(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (window["FirebasePlugin"]) {
        window["FirebasePlugin"].fetch(0, (result) => {
          // activate the fetched remote config
          console.log(JSON.stringify(result)); //Always "OK"
          window["FirebasePlugin"].activateFetched((bool) => {

            if(key == "slider_images"){
              this.getSliderImageURLs(key).then((d) => {
                console.log("d", d);
                resolve(d);
              });
            }

            if(key == "store_url"){
              this.getStoreURL(key).then((d) => {
                console.log("d", d);
                resolve(d);
              });
            }
            
          });
        })
      }
      else {
        reject();
      }
    });
  }

  private getSliderImageURLs(key: string): Promise<any> {

    //key will always be "slider_images"
    var urls = [];

    //default images
    // urls.push("http://samarth.cloudapp.net/wp-content/uploads/2017/05/slide_1.jpg");
    // urls.push("http://samarth.cloudapp.net/wp-content/uploads/2017/05/slide_2.jpg");
    // urls.push("http://samarth.cloudapp.net/wp-content/uploads/2017/05/slide_3.jpg");
    // urls.push("http://samarth.cloudapp.net/wp-content/uploads/2017/05/slide_4.jpg");

    return new Promise<any>((resolve, reject) => {
      var urls = [];
      window["FirebasePlugin"].getValue(key, (result) => {
        urls = JSON.parse(result);
        //console.log("FROM getSliderImageURLs()");
        //console.log(urls)
        resolve(urls);
      });
    });
  }

  private getStoreURL(key: string): Promise<any> {

    //key will always be "store_url"
    return new Promise<any>((resolve, reject) => {
      var url = "";
      window["FirebasePlugin"].getValue(key, (result) => {
        url = JSON.parse(result);
        //console.log("FROM getSliderImageURLs()");
        //console.log(urls)
        resolve(url);
      });
    });
  }
}
