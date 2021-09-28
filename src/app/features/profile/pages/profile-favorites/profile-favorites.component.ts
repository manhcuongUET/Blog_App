import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IProfile } from '@core/models/profile.model';
import { IArticleListConfig } from '@core/models/article-config.model';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  limit: number = 10;
  profile: IProfile;
  favoritesConfig: IArticleListConfig = {
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
        this.favoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}
