import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleListConfig } from '@core/models/article-config.model';
import { IProfile } from '@core/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss']
})
export class ProfileArticlesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  limit: number = 10;
  profile: IProfile;
  articlesConfig: IArticleListConfig = {
    type: 'all',
    filters: {}
  };

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.route.parent.data.subscribe(
      (data: {profile: IProfile}) => {
        this.profile = data.profile;
        this.articlesConfig.filters.author = this.profile.username;
      }
    );
  }
}
