import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@shared/services/http.service';
import { IArticle } from '@core/models/article.model';
import { ITag } from '@core/models/tag.model';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpService: HttpService) {}
  private _data: BehaviorSubject<any> = new BehaviorSubject<object>([]);
  data$: Observable<any> = this._data.asObservable();
  setData(obj: any) {
    this._data.next(obj);
  }
  getFeedUser() {
    return this.httpService.getData('/articles/feed?limit=10&offset=0');
  }
  getAllArticle() {
    return this.httpService.getData('/articles');
  }

  getArticles(name: string) {
    return this.httpService.getData(`/articles?author=${name}`);
  }
  favorite(slug): Observable<{ article: IArticle}> {
    return this.httpService.postData('/articles/' + slug + '/favorite', {});
  }
  unfavorite(slug): Observable<{article: IArticle}> {
    return this.httpService.deleteData('/articles/' + slug + '/favorite');
  }
}
