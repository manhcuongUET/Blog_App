import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeedToLoginGuard } from '@core/guards/protect-setting.guard';
import { EditorComponent } from './editor.component';
import { ArticleComponent } from './pages/article/article/article.component';
import { EditorDetailComponent } from './pages/editor-detail/editor-detail.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      // add route here not add outside
      {
        path: '',
        component: EditorDetailComponent,
        canActivate: [NeedToLoginGuard],
        pathMatch: 'full'
      },
      {
        path: ':slug',
        component: EditorDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'article/:slug',
        component: ArticleComponent,
        pathMatch: 'full'
      },
     
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
