import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/shared/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin$: Observable<boolean>;
  username$: Observable<string>;
  constructor(public authService: AuthService) {}

  initData() {
    this.username$ = this.authService.user$.pipe(map((res) => res?.username));
    this.isLogin$ = this.authService.user$.pipe(map((res) => !!res));
  }

  ngOnInit(): void {
    this.initData();
  }
}
