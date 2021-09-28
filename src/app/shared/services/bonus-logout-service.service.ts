import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class BonusLogoutServiceService {
  readonly TIME_LIMIT_TO_LOGOUT = 10; //minutes
  readonly TIME_INTERVAL = 20000;
  readonly KEY_LOGOUT = 'LOGOUT';
  private subject = new BehaviorSubject<boolean>(false);
  check$: Observable<boolean> = this.subject.asObservable();
  constructor() {
    this.setIntervalTime();
  }

  setIntervalTime() {
    setInterval(() => {
      this.checkLogoutIfMeetLimitTime();
    }, this.TIME_INTERVAL);
  }
  setTimeLocal() {
    localStorage.setItem(this.KEY_LOGOUT, Date.now().toString());
  }

  getCurrentTimeLimit() {
    return +localStorage.getItem(this.KEY_LOGOUT);
  }

  checkLogoutIfMeetLimitTime() {
    let currentTime = Date.now();
    let timeLocal =
      this.getCurrentTimeLimit() + this.TIME_LIMIT_TO_LOGOUT * 60 * 1000;
    let rangeTime = timeLocal - currentTime;
    if (rangeTime < 0) {
      this.subject.next(true);
    }
  }
}
