import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent implements OnInit{
  @Input() _title: string = "";
  @Input() _body: string = "";
  @Input() _ViewContainerRef: ViewContainerRef | undefined = undefined;
  @Input() _isPhonePortrait: boolean = false;
  @Output() closeWindow: EventEmitter<ViewContainerRef> = new EventEmitter();

  ngOnInit(): void {
    this._body = formatBody(this._body);
  }

  close(): void {
    this.closeWindow.emit(this._ViewContainerRef);
  }
}

function formatBody(text: string): string {
  const bulletPattern: RegExp = /\* (.+?) \*\*/g;

  text = text.replaceAll('\n', '<br>');
  text = text.replaceAll(bulletPattern, bulletReplace);
  return text;
}

function bulletReplace(match: string, content: string): string {
  let result = "<ul><li>"+content+"</li></ul>"
  return result
}