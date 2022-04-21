import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutgameComponent } from './components/aboutgame/aboutgame.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { CommentsFeedbackComponent } from './components/comments-feedback/comments-feedback.component';
import { DownloadComponent } from './components/download/download.component';
import { RankingResultsComponent } from './components/ranking-results/ranking-results.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AboutgameComponent,
    AboutusComponent,
    AdminCommentsComponent,
    CommentsFeedbackComponent,
    DownloadComponent,
    RankingResultsComponent,
    TechnologiesComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
