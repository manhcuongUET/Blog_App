import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { SharedModule } from '@shared/shared.module';
import { EditorDetailComponent } from './pages/editor-detail/editor-detail.component';
import { ArticleComponent } from './pages/article/article/article.component';
import { ProfileModule } from '@profile/profile.module';
import { ArticleCommentComponent } from './pages/article/article-comment/article-comment.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    EditorComponent,
    EditorDetailComponent,
    ArticleComponent,
    ArticleCommentComponent,
  ],
  imports: [
    SharedModule,
    EditorRoutingModule,
    ProfileModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  providers: [

  ]
})
export class EditorModule { }
