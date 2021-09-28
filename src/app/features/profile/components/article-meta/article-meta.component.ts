import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '@core/models/article.model';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent implements OnInit {
  @Input() article: IArticle;
  ngOnInit() {
  }
}
