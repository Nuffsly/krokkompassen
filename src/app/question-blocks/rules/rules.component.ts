import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent {
  @Input() _title: string = "";
  @Input() _body: string = "";
  @Output() closeWindow: EventEmitter<void> = new EventEmitter();
}
