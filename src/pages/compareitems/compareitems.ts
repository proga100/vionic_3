import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController, ViewController} from 'ionic-angular';
import { InfoComponent } from '../../components/info/info';
import { ProductdetailsPage } from '../../pages/productdetails/productdetails';

@Component({
  selector: 'page-compareitems',
  templateUrl: 'compareitems.html',
})
export class CompareitemsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {

  	this.infoModal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompareitemsPage');
  }
  infoModal() {
    let modal = this.modalCtrl.create(InfoComponent);
    modal.present();
  }

    productDetails(){
    this.navCtrl.push(ProductdetailsPage);
  }
}
