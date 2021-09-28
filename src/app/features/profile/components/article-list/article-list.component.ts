import { SpinnerService } from '@shared/services/spinner.service';

import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '@core/models/article.model';
import { IArticleListConfig } from '@core/models/article-config.model';
import { ArticleService } from '@shared/services/article.service';
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  constructor(
    private articlesService: ArticleService,
    private spinner: SpinnerService,
    private translate: TranslateService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: IArticleListConfig) {
    if (config) {
      this.queryString = config;
      this.currentPage = 1;
      this.getData();
    }
  }
  queryString: IArticleListConfig;
  results: IArticle[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.getData();
  }

  getData() {
    this.loading = true;
    this.results = [];
    if (this.limit) {
      this.queryString.filters.limit = this.limit;
      this.queryString.filters.offset = this.limit * (this.currentPage - 1);
    }

    const loading$ = this.articlesService
      .getArticles(this.queryString)
      .pipe(delay(300));
    this.spinner.onLoadObserver(loading$).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;
      //The Array.from() static method creates a new, shallow-copied Array instance from an array-like or iterable object.
      // Math.ceil làm tròn lên 1.2 -> 2
      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / this.limit)),
        (value, index) => index + 1
      );
    });
  }
}
