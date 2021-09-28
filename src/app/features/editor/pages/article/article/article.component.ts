import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '@core/models/article.model';
import { IComment } from '@core/models/comment.model';
import { IUser } from '@core/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from '@shared/services/article.service';
import { CommentService } from '@shared/services/comment.service';
import { MessageService } from '@shared/services/mesage.service';
import { UserService } from '@shared/services/user.service';
import { concat, forkJoin, merge, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: IArticle;
  comments: IComment[] = [];
  currentUser: IUser;
  isChange: boolean;
  slugs: string;
  isSubmited = false;
  isDelete = false;
  commentControl = new FormControl('');
  constructor(
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.slugs = this.route.snapshot.params['slug'];
    if (this.slugs) {
      let data = [];
      let ob1$ = this.articleService.get(this.slugs);
      let ob2$ = this.userService.user$;
      concat(ob1$, ob2$)
        .pipe(map((res) => data.push(res)))
        .subscribe((r) => {
          if (data.length > 1) {
            this.article = data[0];
            this.currentUser = data[1];
            if (data[0].author?.username === data[1]?.username) {
              this.isChange = true;
            }
            this.commentArticle();
          }
        });
    }
  }
  commentArticle() {
    this.commentService.getAllComment(this.article.slug).subscribe((res) => {
      this.comments = res;
    });
  }

  addComment() {
    const commentBody = this.commentControl.value.trim();
    if (!commentBody) {
      return;
    }
    this.commentService.addComment(this.article.slug, commentBody).subscribe(
      (res) => {
        this.comments.unshift(res);
        this.commentControl.reset('');
        (this.isSubmited = false),
          this.messageService.sendMessage({
            title: this.translate.instant('editor.message.post_success'),
            type: 'success',
          });
      },
      (err) => {
        this.isSubmited = false;
        alert(err);
      }
    );
  }

  deleteArticle() {
    this.isDelete = true;
    this.articleService.delete(this.article.slug).subscribe((res) => {
      this.router.navigateByUrl('/');
      this.messageService.sendMessage({
        title: this.translate.instant('editor.message.delete_success'),
        type: 'success',
      });
    });
  }
  deleteCommentArticle(comment) {
    this.commentService
      .delete(comment.id, this.article.slug)
      .subscribe((res) => {
        this.comments = this.comments.filter((item) => item !== comment);
        this.messageService.sendMessage({
          title: this.translate.instant(
            'editor.message.delete_comment_success'
          ),
          type: 'success',
        });
      });
  }
  onFavorite(favorited: boolean) {
    this.article.favorited = favorited;

    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  onFollowing(following: boolean) {
    this.article.author.following = following;
  }
}
