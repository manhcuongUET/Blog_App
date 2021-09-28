import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@auth/shared/auth.service';
import { MessageService } from '@shared/services/mesage.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class NeedToLoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLogined$.pipe(
      tap((res) => {
        if (!res){
          this.router.navigate(['/auth/login']);
          this.messageService.sendMessage({
            title:'You need to login firstly!',
            type: 'warning'
          })
        }

      }),
      map((res) => !!res)
    );
  }
}
