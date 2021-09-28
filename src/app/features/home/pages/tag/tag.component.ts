import { Component, OnInit } from '@angular/core';
import { IArticle } from '@core/models/article.model';
import { HomeService } from '@home/shared/home.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  tagList = [];
  pageFeed: number = 1;
  totalLength: number;
  isShow=true;
  constructor(
    private tagService: HomeService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.tagService.data$.subscribe((item) => {
      this.tagList = item;
      this.totalLength = this.tagList.length;
      if(this.tagList.length==0){
        this.isShow=false;
      }else{
        this.isShow=true;
      }
    });
  }
  onToggleFavorite(favorited: IArticle) {
    if (favorited.favorited) {
      this.homeService
        .unfavorite(favorited.slug)
        .subscribe((data: { article: IArticle }) => {
          this.tagList = this.tagList.map((res) => {
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
          this.tagList = this.tagList.map((res) => {
            if (res.slug == favorited.slug) {
              return { ...data.article };
            }
            return res;
          });
        });
    }
  }
}
