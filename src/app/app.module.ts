import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuTitleComponent } from './components/menu-title/menu-title.component';
import { BigCardComponent } from './components/big-card/big-card.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './pages/content/content.component';
import { NoticeMainComponent } from './components/notice-main/notice-main.component';
import { AboutComponent } from './pages/about/about.component';
import { LatestBlogComponent } from './components/latest-blog/latest-blog.component';
import { LatestBlogTitleComponent } from './components/latest-blog-title/latest-blog-title.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectsTitleComponent } from './components/projects-title/projects-title.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuTitleComponent,
    BigCardComponent,
    SmallCardComponent,
    HomeComponent,
    FooterComponent,
    ContentComponent,
    NoticeMainComponent,
    AboutComponent,
    LatestBlogComponent,
    LatestBlogTitleComponent,
    ProjectsComponent,
    ProjectsTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
