import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InterceptorService } from './interceptor/interceptor.service';
import { throwIfAppearMoreOneTime } from './guards/import-module.guard';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
import { NeedToLoginGuard } from './guards/protect-setting.guard';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { httpTranslateFactory } from '../app.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  imports: [CommonModule, HttpClientModule, RouterModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  exports: [HeaderComponent, FooterComponent, PageNotFoundComponent],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAppearMoreOneTime(parentModule, 'CoreModule');
  }
}
