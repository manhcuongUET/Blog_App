import { Injectable } from '@angular/core';
import { ITag } from '@core/models/tag.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()
export class TagService {
  private subject = new BehaviorSubject<ITag>(null);
  tag$: Observable<ITag>;
  constructor(private httpService: HttpService) {}
  getTag() {
    return this.httpService.getData('/tags');
  }
}
