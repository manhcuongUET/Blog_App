import { IUser } from '@core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { UserService } from '@shared/services/user.service';
import { IProfile } from '@core/models/profile.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService
  ) {}
  navLinks: any[];
  activeLinkIndex = -1;
  profile: IProfile;
  currentUser: IUser;
  isUser: boolean;

  ngOnInit() {
    this.initData();
    this.setTranslate();
    this.translate.onLangChange.subscribe((res) => {
      this.setTranslate();
    });

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => {
          tab.link === this.router.url;
        })
      );
    });
  }
 setTranslate() {
  this.navLinks = [
    {
      label: this.translate.instant('profile.title.mypost'),
      link: `/profile/${this.profile.username}`,
      index: 0,
    },
    {
      label: this.translate.instant('profile.title.favorite'),
      link: `/profile/${this.profile.username}/favorites`,
      index: 1,
    },
  ];
 }
  initData() {
    this.route.data
      .pipe(
        concatMap((data: { profile: IProfile }) => {
          this.profile = data.profile;
          return this.userService.getUserInfor().pipe(
            tap((user: IUser) => {
              this.currentUser = user;
              this.isUser = this.currentUser?.username === this.profile?.username;
            })
          );
        })
      )
      .subscribe();
  }

  toggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
