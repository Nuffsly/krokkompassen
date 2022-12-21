import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent {
  @Input() _title: string = "";
  @Input() _body: string = "";
  @Input() _ViewContainerRef: ViewContainerRef | undefined = undefined;
  @Input() _isPhonePortrait: boolean = false;
  @Output() closeWindow: EventEmitter<ViewContainerRef> = new EventEmitter();

  close(): void {
    this.closeWindow.emit(this._ViewContainerRef);
  }
}