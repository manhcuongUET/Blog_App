import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from '@auth/shared/auth.const';
import { AuthService } from '@auth/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '@shared/services/http.service';
import { MessageService } from '@shared/services/mesage.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss', '../../shared/auth.style.scss'],
})
export class SettingComponent implements OnInit {
  formUser: FormGroup;
  isSubmit: boolean = false;
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private translate: TranslateService
  ) {}
  get f() {return this.formUser.controls;}
  ngOnInit(): void {
    this.createFormUser();
  }
  createFormUser() {
    this.formUser = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.pattern(constants.pattern.email)],
      ],
      bio: [null],
      image: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.userService.getUserInfor().subscribe(res => {
      this.formUser.patchValue({
        ...res
      })
    })
  }
  onUpdateUser() {
    this.isSubmit = true;
    if (this.formUser.invalid) return;
    this.httpService
      .updateData('/user', { user: this.formUser.value })
      .subscribe((res) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', btoa(JSON.stringify(res.user)));
        this.userService.saveInforUser(res.user);
        this.formUser.reset();
        this.authService.initToken();
        this.router.navigateByUrl('/');
        this.messageService.sendMessage({
          title:  this.translate.instant('common.message.update_success'),
          type: 'success',
        });
      },
      (err: HttpErrorResponse) => {
        if(err.status === 422) {
          this.messageService.sendMessage({
            title: 'email ' + err.error.errors.email,
            type: 'error'
          })
        }
      });
  }
  onLogout() {
    localStorage.clear();
    this.authService.initToken();
    this.router.navigate(['/auth/login']);
    this.userService.clearUser();
  }
}
