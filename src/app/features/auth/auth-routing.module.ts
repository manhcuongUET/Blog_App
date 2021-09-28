import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoNeedGuardService } from '@core/guards/no-need.guard';
import { NeedToLoginGuard } from '@core/guards/protect-setting.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SettingComponent } from './pages/setting/setting.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children: [
      {
        path: 'settings',
        component: SettingComponent,
        canActivate:[NeedToLoginGuard]
      },
      {
        path: 'login',
        component:LoginComponent,
        canActivate: [NoNeedGuardService]
      },
      {
        path: 'register',
        component: SignupComponent,
        canActivate: [NoNeedGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
