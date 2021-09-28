import { Injectable } from '@angular/core';
import { IMessage } from '@shared/components/message/message.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private subject = new BehaviorSubject<any>(null);
  message$: Observable<IMessage> = this.subject.asObservable();
  constructor() {}
  sendMessage(mess: IMessage) {
    this.subject.next(mess);
  }
}
