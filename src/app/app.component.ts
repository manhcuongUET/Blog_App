import { Component } from '@angular/core';
import { AuthService } from '@auth/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BonusLogoutServiceService } from '@shared/services/bonus-logout-service.service';
import { MessageService } from '@shared/services/mesage.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen: boolean = false;
  constructor(
    private translate: TranslateService, 
    private message: MessageService,
    private authService: AuthService,
    private userService: UserService,
    private bonus: BonusLogoutServiceService) {
        this.bonus.check$.subscribe(res => {
          if(res) {
            this.authService.logout();
            this.userService.clearUser();
          }
        })
    }
  onChangeLang(lang: string) {
    if(lang !== ''){
      this.translate.use(lang).subscribe(res => {
        this.isOpen = !this.isOpen;
        this.message.sendMessage({
          title: this.translate.instant('common.message.change_lang.success'),
          type: 'success'
        })
      }, err =>{
        this.message.sendMessage({
          title: this.translate.instant('common.message.change_lang.failed'),
          type: 'error'
        })
      })
    }
    
  }
  onToggleSettings() {
    this.isOpen = !this.isOpen;
  }
}
