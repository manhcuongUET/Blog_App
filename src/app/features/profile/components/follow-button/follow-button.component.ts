import { ProfilesService } from './../../../../shared/services/profile.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IProfile } from '@core/models/profile.model';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() profile: IProfile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.getUserInfor().pipe(concatMap(
      (user) => {
        if (!user) {
          this.router.navigateByUrl('auth/login');
          return of(null);
        }
        if (!this.profile.following) {
          return this.profilesService.follow(this.profile.username)
          .pipe(tap(
            res => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        } else {
          return this.profilesService.unfollow(this.profile.username)
          .pipe(tap(
            res => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }
      }
    )).subscribe();
  }
}
