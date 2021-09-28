import { Injectable } from '@angular/core';
import { IArticleListConfig } from '@core/models/article-config.model';
import { IArticle } from '@core/models/article.model';
import { BehaviorSubject, Observable, ObservableLike } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable()
export class ArticleService {
  private subject = new BehaviorSubject<IArticle>(null);
  article$: Observable<IArticle> = this.subject.asObservable();
  constructor(private httpService: HttpService) {}

  getArticles(
    config: IArticleListConfig
  ): Observable<{ articles: IArticle[]; articlesCount: number }> {
    const params = {};
    Object.keys(config.filters).forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.httpService.getData(
      '/articles' + (config.type === 'feed' ? '/feed' : ''),
      { params: params }
    );
  }

  get(slug): Observable<IArticle> {
    return this.httpService
      .getData('/articles/' + slug)
      .pipe(map((data) => data.article));
  }

  favorite(slug): Observable<IArticle> {
    return this.httpService.postData('/articles/' + slug + '/favorite', {});
  }

  unfavorite(slug): Observable<IArticle> {
    return this.httpService.deleteData('/articles/' + slug + '/favorite');
  }

  delete(slug) {
    return this.httpService.deleteData('/articles/' + slug);
  }

  saveArticle(article: IArticle): Observable<IArticle> {
    //update article
    return this.httpService
      .postData('/articles/', { article: article })
      .pipe(map((res) => res.article));
  }

  updateArticel(slug: string, article: IArticle) {
    return this.httpService
      .updateData('/articles/' + slug, { article: article })
      .pipe(map((res) => res.article));
  }
}
