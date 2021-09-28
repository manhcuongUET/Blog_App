import { Component, OnInit } from '@angular/core';
import { IArticle } from '@core/models/article.model';
import { HomeService } from '@home/shared/home.service';

@Component({
  selector: 'app-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss'],
})
export class GlobalFeedComponent implements OnInit {
  totalLength: number;
  pageGlobal: number = 1;
  data = [];
  isShow=true;
  constructor(private globalFeedService: HomeService) {}

  ngOnInit(): void {
    this.globalFeedService.getAllArticle().subscribe((item) => {
      this.data = item.articles;
      this.totalLength = this.data.length;
      if(this.data.length==0){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    });
  }
  onToggleFavorite(favorited: IArticle) {
    if (favorited.favorited) {
      this.globalFeedService
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
      this.globalFeedService
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
}
