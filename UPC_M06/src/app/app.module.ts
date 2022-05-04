import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutgameComponent } from './components/aboutgame/aboutgame.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CommentsFeedbackComponent } from './components/comments-feedback/comments-feedback.component';
import { DownloadComponent } from './components/download/download.component';
import { RankingResultsComponent } from './components/ranking-results/ranking-results.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { DatePipe } from '@angular/common';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    AboutgameComponent,
    AboutusComponent,
    CommentsFeedbackComponent,
    DownloadComponent,
    RankingResultsComponent,
    TechnologiesComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditCommentComponent,
    AdminCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    CarouselModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxPaginationModule
  ],
  providers: [DatePipe, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
