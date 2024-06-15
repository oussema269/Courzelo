import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { QuestionListComponent } from './Question/question-list/question-list.component';
import { ListDomaineComponent } from './domaine/list-domaine/list-domaine.component';
import { UpdateDomaineComponent } from './update-domaine/update-domaine.component';
import { DeleteDomaineComponent } from './domaine/delete-domaine/delete-domaine.component';
import { AjoutDomaineComponent } from './domaine/ajout-domaine/ajout-domaine.component';
import { PhotoComponent } from './photo/photo.component';
import { AddCommentaireComponent } from './commentaire/add-commentaire/add-commentaire.component';
import { ListeCommentaireComponent } from './liste-commentaire/liste-commentaire.component';
import { SupportComponent } from './support/support.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { AddBlogComponent } from './Blog/add-blog/add-blog.component';
import { ListBlogComponent } from './Blog/list-blog/list-blog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UploadFileComponent } from './Blog/upload-file/upload-file.component';
import { UpdateBlogComponent } from './Blog/update-blog/update-blog.component';
import { BlogDetailsComponent } from './Blog/blog-details/blog-details.component';
import { BlogGridsComponent } from './Blog/blog-grids/blog-grids.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LoginComponent } from './core/front-office/Formateur-Admin/login/login.component';

import { EditProfileComponent } from './core/back-office/User/edit-profile/edit-profile.component';
import { AdminListComponent } from './core/back-office/User/admin-list/admin-list.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AddProfileComponent } from './core/back-office/User/add-profile/add-profile.component';
import { TwoWayFactorPageComponent } from './core/front-office/two-way-factor-page/two-way-factor-page.component';
import { FormateurListComponent } from './core/back-office/User/formateur-list/formateur-list.component';
import { UploadFileUserComponent } from './core/back-office/User/upload-file-user/upload-fileUser.component';
import { AddAdminComponent } from './core/back-office/User/add-admin/add-admin.component';
import { AddFormateurComponent } from './core/back-office/User/add-formateur/add-formateur.component';
import { CourseListComponent } from './cour/course-list/course-list.component';
import { AddCourseComponent } from './cour/add-course/add-course.component';
import { CourseDeleteComponent } from './cour/course-delete/course-delete.component';
import { CourseUpdateComponent } from './cour/course-update/course-update.component';
import { StripeComponent } from './cour/stripe/stripe.component';
import { AddRessourceComponent } from './cour/add-ressource/add-ressource.component';
import { RessourceListComponent } from './cour/ressource-list/ressource-list.component';
import { RessourceMaterialsComponent } from './cour/ressource-materials/ressource-materials.component';
import { ListComponent } from './cour/video/list/list.component';
import { ChatComponent } from './cour/chat/chat/chat.component';
import { AddFaculteComponent } from './Faculte/add-faculte/add-faculte.component';
import { EditFaculteComponent } from './Faculte/edit-faculte/edit-faculte.component';
import { DeleteFaculteComponent } from './Faculte/delete-faculte/delete-faculte.component';
import { FaculteListComponent } from './Faculte/faculte-list/faculte-list.component';
import { UpdatePoleComponent } from './Pole/update-pole/update-pole.component';
import { DeletePoleComponent } from './Pole/delete-pole/delete-pole.component';
import { PoleListComponent } from './Pole/pole-list/pole-list.component';
import { AddPoleComponent } from './Pole/add-pole/add-pole.component';
import { UploadFileFacComponent } from './Faculte/upload-file/upload-fileFac.component';
import { UploadFilePoleComponent } from './Pole/upload-file-pole/upload-file-pole.component';
import { AddQuestionComponent } from './Question/add-question/add-question.component';
import { UpdateQuestionComponent } from './Question/update-question/update-question.component';

import { PoleListFrontComponent } from './Pole/pole-list-front/pole-list-front.component';
import { FaculteListFrontComponent } from './Faculte/faculte-list-front/faculte-list-front.component';

import { LoginParticipantComponent } from './core/front-office/Participant/login-participant/login-participant.component';
import { RegisterComponent } from './core/front-office/Participant/register/register.component';
import { AuthGuard } from './core/Guard/auth.guard';
import { FicheModuleCour } from './model/ChatMessage';
import { AddFicheModuleComponent } from './cour/add-fiche-module/add-fiche-module.component';
import { ClassListComponent } from './Class/class-list/class-list.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { QuizListComponent } from './Quiz/quiz-list/quiz-list.component';
import { MakeQuizComponent } from './Quiz/make-quiz/make-quiz.component';
import { QuizResultsComponent } from './Quiz/quiz-results/quiz-results.component';
import { AuthParticipantGuard } from './core/Guard/guardParticipant/auth-participant.guard';
import { ResetPasswordComponent } from './core/front-office/reset-password/reset-password.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ChangePasswordComponent } from './core/back-office/User/change-password/change-password.component';
import { UpdateReclamationComponent } from './update-reclamation/update-reclamation.component';
import { NotificationComponent } from './cour/notification/notification.component';


const routes: Routes = [
  //dev
  { path: "navbar", component: NavbarComponent },
  { path: "sidebar", component: SideBarComponent },
  { path: "home", component: HomeComponent },

  //youssef
  {path:"login",component:LoginParticipantComponent},
  {path:"login-id",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  { path:"verify-code", component: TwoWayFactorPageComponent },

  {path:"reset-password",component: ResetPasswordComponent },
  {path:"change-password",component: ChangePasswordComponent },

  {path:"addProfile",component:AddProfileComponent, canActivate : [AuthGuard]},
  {path:"editProfile",component:EditProfileComponent, canActivate : [AuthGuard]},
  {path:"user/upload/:id", component:UploadFileUserComponent, canActivate : [AuthGuard]},

  {path:"formateur-list",component:FormateurListComponent, canActivate : [AuthGuard]} ,   
  {path:"admin-list",component:AdminListComponent, canActivate : [AuthGuard]},

  {path:"addAdmin",component:AddAdminComponent, },
  {path:"addFormateur",component:AddFormateurComponent},

  //videoCall
  {path:"video-call",redirectTo:'assets/VideoCallZegoCloud/videoCall.html'},
  {path:"new-meet",redirectTo:'assets/VideoCallZegoCloud/createMeet.html'},


  //oussema
  { path: "courselist/:idDomaine", component: CourseListComponent },
  { path: "add-course", component: AddCourseComponent },
  { path: "delete-course", component: CourseDeleteComponent },
  { path: "course-update/:id", component: CourseUpdateComponent },
  { path: "course-stripe/:prix", component: StripeComponent },
  { path: "add-ressource/:id", component: AddRessourceComponent },
  { path: "ressource-list/:id", component: RessourceListComponent },
  { path: "ressource-materials/:id", component: RessourceMaterialsComponent },
  { path: 'listVideo/:nomVideo', component: ListComponent },
  { path: 'chat', component: ChatComponent },
  { path: "add-ficheCour", component: AddFicheModuleComponent },
  {path:"notification",component:NotificationComponent},


  //kaycer
  { path: "addBlog", component: AddBlogComponent , canActivate : [AuthParticipantGuard]},
  { path: "listBlog", component: ListBlogComponent , canActivate : [AuthParticipantGuard]},
  { path: "dashboard", component: UserDashboardComponent },
  { path: "upload/:id", component: UploadFileComponent },
  { path: "updateBlog/:id", component: UpdateBlogComponent },
  { path: "detailsBlog/:id", component: BlogDetailsComponent },
  { path: "blogsGrids", component: BlogGridsComponent },
  //kaycer2
  // { path: "classDetail/:id", component: UpdateBlogComponent },
  { path: "listClasses/:id", component: ClassListComponent },
  { path: "addClass", component: AddClassComponent },

  //yosra 
  { path: 'getAllFacultes/:id', component: FaculteListComponent , canActivate : [AuthGuard]},
  { path: 'getAllFacultesFront/:id', component: FaculteListFrontComponent , canActivate : [AuthParticipantGuard]},
  { path: 'addFaculte/:id', component: AddFaculteComponent , canActivate : [AuthGuard]},
  { path: 'modifierFaculte/:id', component: EditFaculteComponent, canActivate : [AuthGuard] },
  { path: 'deleteFaculte', component: DeleteFaculteComponent , canActivate : [AuthGuard]},
  { path: 'getAllPoles', component: PoleListComponent , canActivate : [AuthGuard]},
  { path: 'getAllPolesFront', component: PoleListFrontComponent, canActivate : [AuthParticipantGuard] },
  { path: 'addPole', component: AddPoleComponent , canActivate : [AuthGuard] },
  { path: 'modifierPole/:id', component: UpdatePoleComponent , canActivate : [AuthGuard]},
  { path: 'deletePole', component: DeletePoleComponent , canActivate : [AuthGuard]},
  { path: 'uploadFacultePhoto/:id', component: UploadFileFacComponent , canActivate : [AuthGuard]},
  { path: 'uploadPolePhoto/:id', component: UploadFilePoleComponent , canActivate : [AuthGuard]},
  
  //nabil
  { path: "support", component: SupportComponent , canActivate : [AuthParticipantGuard]},
  { path: "list", component: ListReclamationComponent , canActivate : [AuthGuard]},
  { path: "support", component: SupportComponent },
  { path: "list", component: ListReclamationComponent },
  {path:"update/:id" , component: UpdateReclamationComponent},
  //iheb 
  { path: 'domaines', component: ListDomaineComponent , canActivate : [AuthParticipantGuard]},
  { path: 'addDomaine', component: AjoutDomaineComponent , canActivate : [AuthGuard]},
  { path: 'update-domaine/:id', component: UpdateDomaineComponent , canActivate : [AuthGuard]},
  { path: 'deleteDomain/:id', component: DeleteDomaineComponent , canActivate : [AuthGuard]},
  { path: 'uploadimg/:id', component: PhotoComponent , canActivate : [AuthGuard] },
  { path: 'addCommentaire', component: AddCommentaireComponent , canActivate : [AuthParticipantGuard]},
  { path: 'commentaires', component: ListeCommentaireComponent , canActivate : [AuthGuard]},
  //nour
  { path: "question-list", component: QuestionListComponent , canActivate : [AuthGuard]},
  {path:"addQuestion",component:AddQuestionComponent, canActivate : [AuthGuard]},
  {path:"updateQuestion/:id",component:UpdateQuestionComponent, canActivate : [AuthGuard]},
  {path:"quiz-list",component:QuizListComponent, canActivate : [AuthGuard]},
  { path: 'quiz/:id', component: MakeQuizComponent , canActivate : [AuthGuard]},
  { path: 'quiz-results', component: QuizResultsComponent , canActivate : [AuthGuard]},
  //404 error
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
