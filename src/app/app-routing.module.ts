import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { ArticleComponent } from './view/article/article.component';
import { LoginComponent } from './view/login/login.component';
import { CustomReuseStrategy } from './customReuseStrategy/customReuseStratege';
import { CategoryComponent } from './view/category/category.component';
import { MsgBoradPageComponent } from './view/msg-borad-page/msg-borad-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { WatchDeactivateGuard } from './customReuseStrategy/guard/watchComponentRouteState';
import { FriendComponent } from './view/friend/friend.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { keepAlive: true },
    canDeactivate: [WatchDeactivateGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { keepAlive: true },
    canDeactivate: [WatchDeactivateGuard],
  },
  {
    path: 'article/:articleId',
    component: ArticleComponent,
    data: { keepAlive: true },
    canDeactivate: [WatchDeactivateGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'dateCate', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'tagCate', component: CategoryComponent },
  {
    path: 'tagPage/:tagName',
    component: CategoryComponent,
  },
  {
    path: 'folderPage/:folderId',
    component: CategoryComponent,
  },
  {
    path: 'search',
    component: CategoryComponent,
    data: { keepAlive: true },
    canDeactivate: [WatchDeactivateGuard],
  },
  {
    path: 'msgboard',
    component: MsgBoradPageComponent,
    data: { keepAlive: true },
    canDeactivate: [WatchDeactivateGuard],
  },
  {
    path: 'friend',
    component: FriendComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy }],
})
export class AppRoutingModule {}
