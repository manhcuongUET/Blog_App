import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { concatMap, finalize, map, tap } from 'rxjs/operators';

@Injectable()
export class SpinnerService {
  private subject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.subject.asObservable();
  onLoadObserver<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.loadingOn()),
      concatMap(() => obs$),
      finalize(() => this.loadingOff())
    );
  }

  loadingOn() {
    this.subject.next(true);
  }

  loadingOff() {
    this.subject.next(false);
  }
}
