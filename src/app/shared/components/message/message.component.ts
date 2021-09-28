import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MessageService } from '@shared/services/mesage.service';
import { filter } from 'rxjs/operators';

export interface IMessage {
  title: string;
  type: string;
}
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message: IMessage[] = [];
  constructor(
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.messageService.message$.pipe(
      filter(res => !!res)
    ).subscribe(res => {
      this.message.push(res);
      setTimeout(() => {
        this.message.length = 0;
      }, 2000);
    });
  }

}
