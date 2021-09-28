import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@core/models/user.model';
import { BonusLogoutServiceService } from '@shared/services/bonus-logout-service.service';
import { HttpService } from '@shared/services/http.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private subject = new BehaviorSubject<IUser>(null);
  user$: Observable<IUser> = this.subject.asObservable();
  isLogined$: Observable<boolean>;
  isLogoued$: Observable<boolean>;
  constructor(
    private httpService: HttpService,
    private bonusService: BonusLogoutServiceService
  ) {
    this.initToken();
    this.isLogined$ = this.user$.pipe(map((res) => !!res));
    this.isLogoued$ = this.isLogined$.pipe(map((res) => !res));
  }

  logout() {
    this.subject.next(null);
    localStorage.clear();
  }
  initToken() {
    let user = localStorage.getItem('user');
    if (user) {
      let val = JSON.parse(atob(user));
      this.subject.next(val);
    } else {
      this.subject.next(null);
    }
  }
  login(user: {
    email: string;
    password: string;
  }): Observable<{ user: IUser }> {
    return this.httpService.postData('/users/login', { user }).pipe(
      tap((res) => {
        localStorage.setItem('user', btoa(JSON.stringify(res.user)));
        this.subject.next({ ...res.user });
        this.bonusService.setTimeLocal();
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      }),
      shareReplay()
    );
  }
  signup(user: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ user: IUser }> {
    return this.httpService.postData('/users', { user }).pipe(
      tap((res) => {
        localStorage.setItem('user', btoa(JSON.stringify(res.user)));
        this.subject.next({ ...res.user });
        this.bonusService.setTimeLocal();
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}
