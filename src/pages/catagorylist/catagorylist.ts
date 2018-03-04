import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatagorylistPage');
  }
     compareItems(){
     this.navCtrl.push(CompareitemsPage);
  }



}
