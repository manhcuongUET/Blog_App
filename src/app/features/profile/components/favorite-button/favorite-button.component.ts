import { concatMap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IArticle } from '@core/models/article.model';
import { ArticleService } from '@shared/services/article.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss'],
})
export class FavoriteButtonComponent implements OnInit {
  constructor(
    private articlesService: ArticleService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() article: IArticle;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService
      .getUserInfor()
      .pipe(
        concatMap((user) => {
          if (!user) {
            this.router.navigateByUrl('/auth/login');
            return of(null);
          }

          if (!this.article.favorited) {
            return this.articlesService.favorite(this.article.slug).pipe(
              tap(
                (res) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          } else {
            return this.articlesService.unfavorite(this.article.slug).pipe(
              tap(
                (res) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {}
}
