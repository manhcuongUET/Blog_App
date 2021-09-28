import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { HttpService } from '@shared/services/http.service';
import { NeedToLoginGuard } from '@core/guards/protect-setting.guard';
import { MessageService } from '@shared/services/mesage.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { AuthService } from '@auth/shared/auth.service';
import { NoNeedGuardService } from '@core/guards/no-need.guard';
import { UserService } from '@shared/services/user.service';
import { ArticleService } from '@shared/services/article.service';
import { TagService } from '@shared/services/tag.service';
import { ProfilesService } from '@shared/services/profile.service';
import { CommentService } from '@shared/services/comment.service';
import {TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BonusLogoutServiceService } from '@shared/services/bonus-logout-service.service';
// export factory method
export function httpTranslateFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','-conduit.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // core
    CoreModule,
    //shared
    SharedModule,
    //app routing
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    })
    ,
    MatIconModule,
    
  ],
  providers: [
    HttpService,
    MessageService,
    SpinnerService,
    NeedToLoginGuard,
    AuthService,
    NoNeedGuardService,
    UserService,
    ArticleService,
    TagService,
    CommentService,
    AuthService,
    ProfilesService,
    BonusLogoutServiceService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
