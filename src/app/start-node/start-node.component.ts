import { Component, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.scss']
})
export class StartNodeComponent {
  @Output("switchComponent") switchComponent: EventEmitter<string> = new EventEmitter();
  
  switchToQuestionComponent(): void{
    this.switchComponent.emit("questions");
  }
}
