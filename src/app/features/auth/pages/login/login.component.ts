import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from '@auth/shared/auth.const';
import { AuthService } from '@auth/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BonusLogoutServiceService } from '@shared/services/bonus-logout-service.service';
import { MessageService } from '@shared/services/mesage.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { UserService } from '@shared/services/user.service';
import { timer } from 'rxjs';
import { debounce, debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/auth.style.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isSubmit: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private spinner: SpinnerService,
    private translate: TranslateService,
  ) {}
  get f() {return this.formLogin.controls;}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formLogin = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(constants.pattern.email),
        ]),
      ],
      password: [null, Validators.required],
    });
  }

  onSubmitForm() {
    this.isSubmit = true;
    if (this.formLogin.invalid) return;
    const loading$ =  this.authService.login(this.formLogin.value).pipe(delay(300));
    this.spinner.onLoadObserver(loading$).subscribe(
      (res) => {
        this.userService.saveInforUser(res.user);
        this.messageService.sendMessage({
          title: this.translate.instant('auth.message.login_success'),
          type: 'success',
        });
        
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
       
      }
    );
  }
}
