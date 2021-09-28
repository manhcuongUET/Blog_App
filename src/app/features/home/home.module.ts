import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FeedComponent } from './pages/feed/feed.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { YourFeedComponent } from './pages/your-feed/your-feed.component';
import { GlobalFeedComponent } from './pages/global-feed/global-feed.component';
import { TagComponent } from './pages/tag/tag.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule } from '@profile/profile.module';

@NgModule({
  declarations: [HomeComponent, FeedComponent, YourFeedComponent, GlobalFeedComponent, TagComponent],
  imports: [
    HomeRoutingModule,
    SharedModule,
    MatTabsModule,
    NgxPaginationModule,
    TranslateModule.forChild({
      extend: true
    }),
    ProfileModule
  ],
  providers: [],
})
export class HomeModule {}
