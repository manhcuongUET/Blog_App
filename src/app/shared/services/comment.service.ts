import { Injectable } from '@angular/core';
import { IComment } from '@core/models/comment.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable()
export class CommentService {
  private subject = new BehaviorSubject<IComment>(null);
  comment$: Observable<IComment>;
  constructor(private httpService: HttpService) {}

  getAllComment(slug): Observable<IComment[]> {
    return this.httpService
      .getData(`/articles/${slug}/comments`)
      .pipe(map((data) => data.comments));
  }

  addComment(slug, payload): Observable<IComment> {
    return this.httpService
      .postData(`/articles/${slug}/comments`, { comment: { body: payload } })
      .pipe(map((data) => data.comment));
  }

  delete(commentId, slug) {
    return this.httpService.deleteData(
      `/articles/${slug}/comments/${commentId}`
    );
  }
}
