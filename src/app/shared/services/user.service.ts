import { Injectable } from '@angular/core';
import { AuthService } from '@auth/shared/auth.service';
import { IUser } from '@core/models/user.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  private subject = new BehaviorSubject<IUser>(null);
  user$: Observable<IUser> = this.subject.asObservable();
  constructor() {
    let user = localStorage.getItem('user');
    if (user) {
      this.subject.next(JSON.parse(atob(user)));
    }
  }

  saveInforUser(user: IUser) {
    this.subject.next(user);
  }

  getUserInfor(): Observable<IUser> {
    return this.user$;
  }

  clearUser() {
    this.subject.next(null);
  }
}
