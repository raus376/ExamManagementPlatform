import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import { ShowResultComponent } from './pages/user/show-result/show-result.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { ViewQuizByCategoryComponent } from './pages/admin/view-quiz-by-category/view-quiz-by-category.component';
import { UpdateProfileComponent } from './pages/admin/update-profile/update-profile.component';
import { UpdateUserProfileComponent } from './pages/user/update-user-profile/update-user-profile.component';
import { ParticipantComponent } from './pages/user/participant/participant.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {path:'signup',
  component:SignupComponent,
  pathMatch:'full',
},
{
  path:'login',
  component:LoginComponent,
  pathMatch:'full'
},
{
  path:'admin',
  component:DashboardComponent,
  children:[
    {
      path:'',
      component:WelcomeComponent,
    },
    {
      path:'profile',
      component:ProfileComponent,
    },
    {
      path:'categories',
      component:ViewCategoriesComponent
    },{
      path:'add-category',
      component:AddCategoryComponent
    },
    {
      path:'quizzes',
      component:ViewQuizzesComponent
    },
    {
      path:'add-quiz',
      component:AddQuizComponent
    },{
      path:'quiz/:qid',
      component:UpdateQuizComponent
    },{
      path:'view-questions/:qid/:title',
      component:ViewQuizQuestionsComponent
    },
    {
      path:'add-question/:qid/:title',
      component:AddQuestionComponent
    },{
      path:'view-quiz-by-category/:cId',
      component:ViewQuizByCategoryComponent
    },
    {
      path:'update-profile/:uId',
      component:UpdateProfileComponent
    }
  ]
},
{
  path:'user-dashboard',
  component:UserDashboardComponent,
   children:[
    {
      path:':cId',
      component:LoadQuizComponent
    },
    {
      path:'instructions/:qId',
      component:InstructionsComponent
    },
    {
      path:'update-user-profile/:uId',
      component:UpdateUserProfileComponent
    }
   ]
},
{
  path:'start/:qId',
  component:StartComponent,
  pathMatch:'full'
},{
  path:'show-result',
  component:ShowResultComponent,
  pathMatch:'full'
},
{
  path:'user-profile',
  component:UserProfileComponent,
  pathMatch:'full'
},
{
  path:'user-home',
  component:UserHomeComponent,
  pathMatch:'full'
},
{
  path:'participant',
  component:ParticipantComponent,
  pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
