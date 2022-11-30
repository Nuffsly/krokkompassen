import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'krökkompassen';
  activeComponent: string = 'start-node';
  isPhonePortrait: boolean = false;

  constructor(private bpObserver: BreakpointObserver){}

  ngOnInit(): void {
    // Subscribe to neccesary breakpoint observer events
    this.bpObserver.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = false;

        if(result.matches) {
          this.isPhonePortrait = true;
        }
      })
    }

  switchComponent(name: string):void{
    this.activeComponent = name;
  }
}
