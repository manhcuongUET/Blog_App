import { Injectable } from "@angular/core";
import { IArticle } from "@core/models/article.model";
import { HomeService } from "./home.service";

@Injectable({
  providedIn:'root'
})
export class HomeUntil {
  constructor(private homeService: HomeService){}
  onToggleFavorite(favorited: IArticle, data: IArticle[] = []) {
    if (favorited.favorited) {
      this.homeService
        .unfavorite(favorited.slug)
        .subscribe((_data: { article: IArticle }) => {
          data = data.map((res) => {
            if (res.slug == favorited.slug) {
              return { ..._data.article };
            }
            return res;
          });
        });
    } else {
      this.homeService
        .favorite(favorited.slug)
        .subscribe((_data: { article: IArticle }) => {
          data = data.map((res) => {
            if (res.slug == favorited.slug) {
              return { ..._data.article };
            }
            return res;
          });
        });
    }
  }
}


