import { Component } from '@angular/core';
import { BaseComponent } from './shared/components/base-component';
import { UnSubscribe } from './shared/components/un-subscribe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements UnSubscribe{

  constructor() {
    super();
    console.log('first');
  }

    listener(): void {
       // super.autoUnsubscribe(null)
    }
  title = 'demo-app';
}