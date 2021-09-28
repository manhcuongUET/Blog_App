import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.conduit';
import { MessageService } from '@shared/services/mesage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpService {
  host: string | undefined;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.host = environment.apiUrl;
  }

  getData(endpoint: string, options?: any): Observable<any> {
    return this.http.get(`${this.host}${endpoint}`, options);
  }
  //xử lý lỗi
  handleErr(err: HttpErrorResponse) {
    let message = '';
    if (err.status === 401) {
      message = err.error.errors.message;
      this.router.navigateByUrl('/auth/login');
    }
    if (err.status === 400) message = err.error.errors.message;
    if (err.status === 403) message = err.error.errors.message;
    if (err.status === 404) message = err.error.errors.message;
    if (err.status === 422) message = 'common.message.email_password.error';
    this.message.sendMessage({
      title: this.translate.instant(message),
      type: 'error',
    });
  }
  updateData(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.put(`${this.host}${endpoint}`, data, options).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleErr(err);
        return throwError(err);
      })
    );
  }

  postData(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.post(`${this.host}${endpoint}`, data, options).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleErr(err);
        return throwError(err);
      })
    );
  }

  deleteData(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(`${this.host}${endpoint}`, options).pipe(
      catchError((err: HttpErrorResponse) => {
        this.handleErr(err);
        return throwError(err);
      })
    );
  }
}
