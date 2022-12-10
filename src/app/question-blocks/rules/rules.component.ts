import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent {
  @Input() _title: string = "";
  @Input() _body: string = "";
}
