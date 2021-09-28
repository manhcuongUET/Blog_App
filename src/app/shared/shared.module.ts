import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { RouterModule } from "@angular/router";
import { MessageComponent } from './components/message/message.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
  declarations: [
    MessageComponent,
    SpinnerComponent,
    MarkdownPipe
  ],
  imports: [
   CommonModule,
   RouterModule,
   FormsModule,
   ReactiveFormsModule,
   MatProgressSpinnerModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MessageComponent,
    SpinnerComponent,
    MatProgressSpinnerModule,
    MarkdownPipe
  ],
  providers: [


  ]
})

export class SharedModule {

}
