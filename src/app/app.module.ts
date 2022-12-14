import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionBlocksComponent } from './question-blocks/question-blocks.component';
import { StartNodeComponent } from './start-node/start-node.component';
import { RulesComponent } from './question-blocks/rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionBlocksComponent,
    StartNodeComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
