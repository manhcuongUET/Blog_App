import { Component, OnInit } from '@angular/core';
import { HomeService } from '@home/shared/home.service';
import { ArticleService } from '@shared/services/article.service';
import { TagService } from '@shared/services/tag.service';
import { UserService } from '@shared/services/user.service';
import { IArticle } from '@core/models/article.model';
import { ITag } from '@core/models/tag.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  data: IArticle[] = [];
  isLogined: boolean;
  tagList: string[] = [];
  labelTag: string;
  listTag: IArticle[] = [];
  index = 0;
  constructor(
    private feedService: HomeService,
    private userService: UserService,
    private tagService: TagService
  ) {
    this.userService.getUserInfor().subscribe((res) => {
      this.isLogined = Boolean(res);
    });
  }

  ngOnInit(): void {
    this.feedService.getAllArticle().subscribe((item) => {
      this.data = item.articles;
    });
    this.tagService.getTag().subscribe((itemTag) => {
      this.tagList = itemTag.tags;
    });
  }
  clickTag(tag: string) {
    this.labelTag = tag;
    this.listTag = [];
    this.data.forEach((item) => {
      item.tagList.forEach((i) => {
        if (i == tag) {
          this.listTag.unshift(item);
        }
      });
    });
    this.feedService.setData(this.listTag);
    this.index = 2;
  }
}
