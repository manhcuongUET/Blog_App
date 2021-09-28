
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '@shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';
import { ArticlePreviewComponent } from './components/article-preview/article-preview.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleMetaComponent } from './components/article-meta/article-meta.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { ProfileFavoritesComponent } from './pages/profile-favorites/profile-favorites.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { ProfileResolver } from './shared/profile-resolver.service';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileArticlesComponent } from './pages/profile-articles/profile-articles.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FollowButtonComponent,
    ArticleMetaComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    FavoriteButtonComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent,
    ProfileInfoComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    MatTabsModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  exports: [
    ArticleMetaComponent,
    FavoriteButtonComponent,
    FollowButtonComponent
  ],

  providers: [
    ProfileResolver,
  ]
})
export class ProfileModule { }
