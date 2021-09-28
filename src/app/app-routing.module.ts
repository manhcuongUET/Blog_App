import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@home/home.module').then((m) => m.HomeModule),
    pathMatch:'full'
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('@editor/editor.module').then((m) => m.EditorModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },

  {
    path: '**',
    redirectTo: '/page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
