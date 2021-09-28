import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@auth/shared/auth.service";
import { MessageService } from "@shared/services/mesage.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";


@Injectable()
export class NoNeedGuardService implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService,
              private messageService: MessageService
    ){ }


      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
          return this.authService.user$.pipe(
            map(res => !res),
            tap(res => {

              if(!res) {
                this.router.navigateByUrl('/');
                this.messageService.sendMessage({
                  title:'You have already logined!',
                  type: 'warning'
                })
              }
            })
          )
      }


}
