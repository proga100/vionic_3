import { Component } from '@angular/core';
import { ViewController} from 'ionic-angular';

/**
 * Generated class for the InfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'info',
  templateUrl: 'info.html'
})
export class InfoComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello InfoComponent Component');
    this.text = 'Hello World';
  }
  closeModal() {
    console.log('close post modal');
    this.viewCtrl.dismiss();
  }
}
