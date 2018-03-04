import { Component } from '@angular/core';

/**
 * Generated class for the SortComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'sort',
  templateUrl: 'sort.html'
})
export class SortComponent {

  text: string;

  constructor() {
    console.log('Hello SortComponent Component');
    this.text = 'Hello World';
  }

}
