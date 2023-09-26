import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDesignModule } from './nz-design/nz-design.module';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { ArticleComponent } from './view/article/article.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoComponent } from './components/info/info.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ContainerComponent } from './components/container/container.component';
import { ContextComponent } from './components/context/context.component';
import { LoginComponent } from './view/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptor/interceptorProvider';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key],
);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ArticleComponent,
    FooterComponent,
    InfoComponent,
    OverviewComponent,
    ContainerComponent,
    ContextComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NzIconModule.forRoot(icons), FormsModule, ReactiveFormsModule, HttpClientModule, NzDesignModule, BrowserAnimationsModule],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
