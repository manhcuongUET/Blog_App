import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '@core/models/article.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

    @Input() article: IArticle;
    onToggleFavorite(favorited: boolean) {
      this.article.favorited = favorited;
      if (favorited) {
        this.article.favoritesCount++;
      } else {
        this.article.favoritesCount--;
      }
    }
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
  }

}
