import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { ThambnailPage } from '../../pages/thambnail/thambnail';
import { SizeComponent } from '../../components/size/size';
import { QuantityComponent } from '../../components/quantity/quantity';
import { ReadmorePage } from '../../pages/readmore/readmore';
/**
 * Generated class for the ProductdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }
  thambnail(){
     this.navCtrl.push(ThambnailPage);
  }
  size() {
  let modal = this.modalCtrl.create(SizeComponent);
   modal.present(); 
  }
  quantity() {
  let modal = this.modalCtrl.create(QuantityComponent);
   modal.present(); 
  }
  readMore(){
     this.navCtrl.push(ReadmorePage);
  }
}
