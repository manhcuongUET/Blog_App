import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IComment } from '@core/models/comment.model';
import { IUser } from '@core/models/user.model';
import { UserService } from '@shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  @Input() commentUser: IComment;
  @Output() deleteComment = new EventEmitter();
  isChange: boolean;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): Subscription {
    return this.userService.user$.subscribe((user: IUser) => {
      this.isChange = user?.username === this.commentUser?.author?.username;
    });
  }

  ngOnDestroy() {
    this.loadData().unsubscribe();
  }
  onDelete() {
    this.deleteComment.emit(true);
  }
}
