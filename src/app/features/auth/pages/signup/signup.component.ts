import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from '@auth/shared/auth.const';
import { AuthService } from '@auth/shared/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '@shared/services/mesage.service';
import { SpinnerService } from '@shared/services/spinner.service';
import { UserService } from '@shared/services/user.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../shared/auth.style.scss'],
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;
  isSubmit: boolean  = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private spinner: SpinnerService,
    private message: MessageService,
    private translate: TranslateService
  ) {}

  get f() {return this.formSignup.controls;}
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.formSignup = this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(constants.pattern.email),
        ]),
      ],
      password: [null, [Validators.required]],
      username: [null, [Validators.required]],
    });
  }
  onSubmitForm() {
    this.isSubmit = true;
    if (this.formSignup.invalid) return;
    const loading$ =  this.authService.signup(this.formSignup.value).pipe(delay(500));
    this.spinner.onLoadObserver(loading$).subscribe((res) => {
      this.userService.saveInforUser(res.user);
      this.router.navigate(['/']);
      this.message.sendMessage({
        title: this.translate.instant('auth.message.signup_success'),
        type: 'success'
      })
    },
    (err: HttpErrorResponse) => {
      if(err.status === 422) {
        this.message.sendMessage({
          title: ('email ' + err.error.errors?.email) || ( 'username' +err.error.errors?.username ) ||'',
          type: 'error'
        })
      }
    });
  }
}
