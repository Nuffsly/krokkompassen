import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-node',
  templateUrl: './start-node.component.html',
  styleUrls: ['./start-node.component.scss']
})
export class StartNodeComponent {
  @Output("switchComponent") switchComponent: EventEmitter<string> = new EventEmitter();
  @Input() isPhonePortrait: boolean = false;

  switchToQuestionComponent(): void{
    this.switchComponent.emit("questions");
  }
}
