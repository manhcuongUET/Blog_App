import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileArticlesComponent } from './pages/profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './pages/profile-favorites/profile-favorites.component';
import { ProfileInfoComponent } from './pages/profile-info/profile-info.component';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './shared/profile-resolver.service';
import { NeedToLoginGuard } from '@core/guards/protect-setting.guard';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      // add route here not add outside
      {
        path: ':username',
        component: ProfileInfoComponent,
        canActivate: [NeedToLoginGuard],
        resolve: {
          profile: ProfileResolver,
        },
        children: [
          {
            path: '',
            component: ProfileArticlesComponent,
            pathMatch: 'full',
          },
          {
            path: 'favorites',
            component: ProfileFavoritesComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
