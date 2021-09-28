import { Component, Input, OnInit } from '@angular/core';
import { IArticleListConfig } from '@core/models/article-config.model';
import { IArticle } from '@core/models/article.model';
import { HomeService } from '@home/shared/home.service';
import { ArticleService } from '@shared/services/article.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { UserService } from '@shared/services/user.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-your-feed',
  templateUrl: './your-feed.component.html',
  styleUrls: ['./your-feed.component.scss'],
})
export class YourFeedComponent implements OnInit {
  author: string;
  pageFeed: number = 1;
  data = [];
  totalLength: number;
  limit: number = 10;
  queryString: IArticleListConfig;
  results: IArticle[];
  loading = false;
  currentPage = 1;
  isShow=true;
  totalPages: Array<number> = [1];

  @Input() article: IArticle;
  constructor(
    private homeService: HomeService,
    private userService: UserService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfor().subscribe((item) => {
      this.author = item?.username;
    });
    this.getData();
  }

  onToggleFavorite(favorited: IArticle) {
    if (favorited.favorited) {
      this.homeService
        .unfavorite(favorited.slug)
        .subscribe((data: { article: IArticle }) => {
          this.data = this.data.map((res) => {
            if (res.slug == favorited.slug) {
              return { ...data.article };
            }
            return res;
          });
        });
    } else {
      this.homeService
        .favorite(favorited.slug)
        .subscribe((data: { article: IArticle }) => {
          this.data = this.data.map((res) => {
            if (res.slug == favorited.slug) {
              return { ...data.article };
            }
            return res;
          });
        });
    }
  }
  getData() {
    this.loading = true;
    this.results = [];

    const loading$ = this.homeService.getArticles(this.author).pipe(delay(500));
    this.spinner.onLoadObserver(loading$).subscribe((data) => {
      this.loading = false;
      this.results = data.articles;
      this.data = data.articles;
      if(this.data.length==0){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    });
  }
}
