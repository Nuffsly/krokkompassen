import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'krökkompassen';
  activeComponent: string = 'start-node';

  switchComponent(name: string):void{
    this.activeComponent = name;
  }
}
