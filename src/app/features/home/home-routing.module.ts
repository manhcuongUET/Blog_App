import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children:[
      // add route here not add outside
      {
        path:'',
        component:FeedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
