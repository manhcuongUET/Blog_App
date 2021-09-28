import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IProfile } from '@core/models/profile.model';
import { ProfilesService } from '@shared/services/profile.service';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ProfileResolver implements Resolve<IProfile> {
  constructor(
    private profilesService: ProfilesService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.profilesService.getProfile(route.params['username'])
      .pipe(catchError((error) => this.router.navigateByUrl('/')));
  }
}
