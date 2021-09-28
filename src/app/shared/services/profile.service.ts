import { HttpService } from '@shared/services/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfile } from '@core/models/profile.model';

import { map } from 'rxjs/operators';

@Injectable()
export class ProfilesService {
  constructor(private httpService: HttpService) {}

  getProfile(username: string): Observable<IProfile> {
    return this.httpService
      .getData('/profiles/' + username)
      .pipe(map((data: { profile: IProfile }) => data.profile));
  }

  follow(username: string): Observable<IProfile> {
    return this.httpService.postData('/profiles/' + username + '/follow', {});
  }

  unfollow(username: string): Observable<IProfile> {
    return this.httpService.deleteData('/profiles/' + username + '/follow');
  }
}
