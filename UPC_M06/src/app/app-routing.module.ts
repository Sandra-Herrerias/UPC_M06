import { TechnologiesComponent } from './components/technologies/technologies.component';
import { RankingResultsComponent } from './components/ranking-results/ranking-results.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutgameComponent } from './components/aboutgame/aboutgame.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import { CommentsFeedbackComponent } from './components/comments-feedback/comments-feedback.component';
import { DownloadComponent } from './components/download/download.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'welcome',
    component:HomeComponent
  },
  {
    path:'aboutgame',
    component: AboutgameComponent
  },
  {
    path:'aboutus',
    component: AboutusComponent
  },
  {
    path:'admin_comments',
    component: AdminCommentsComponent
  },
  {
    path:'comments_feedback',
    component: CommentsFeedbackComponent
  },
  {
    path:'download',
    component: DownloadComponent
  },
  {
    path:'ranking_results',
    component: RankingResultsComponent
  },
  {
    path:'technologies',
    component: TechnologiesComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {//default
    path:'**',
    redirectTo: 'welcome'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }