import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorComponent } from 'ckeditor4-angular';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './shared/home/home.component';
import { QuestionListComponent } from './Question/question-list/question-list.component';
import { AddQuestionComponent } from './Question/add-question/add-question.component';
import { UpdateQuestionComponent } from './Question/update-question/update-question.component';
import { DeleteQuestionComponent } from './Question/delete-question/delete-question.component';
import { ListDomaineComponent } from './domaine/list-domaine/list-domaine.component';
import { AjoutDomaineComponent } from './domaine/ajout-domaine/ajout-domaine.component';
import { DeleteDomaineComponent } from './domaine/delete-domaine/delete-domaine.component';
import { UpdateDomaineComponent } from './update-domaine/update-domaine.component';
import { PhotoComponent } from './photo/photo.component';
import { AddCommentaireComponent } from './commentaire/add-commentaire/add-commentaire.component';
import { ListeCommentaireComponent } from './liste-commentaire/liste-commentaire.component';
import { SupportComponent } from './support/support.component';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { UpdateReclamationComponent } from './update-reclamation/update-reclamation.component';
import { AddBlogComponent } from './Blog/add-blog/add-blog.component';
import { ListBlogComponent } from './Blog/list-blog/list-blog.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlogService } from './Blog/BlogService/blog.service';
import { UploadFileComponent } from './Blog/upload-file/upload-file.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UpdateBlogComponent } from './Blog/update-blog/update-blog.component';
import { BlogDetailsComponent } from './Blog/blog-details/blog-details.component';
import { BlogGridsComponent } from './Blog/blog-grids/blog-grids.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { LoginComponent } from './core/front-office/Formateur-Admin/login/login.component';

import { EditProfileComponent } from './core/back-office/User/edit-profile/edit-profile.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AdminListComponent } from './core/back-office/User/admin-list/admin-list.component';
import { StudentListComponent } from './core/back-office/User/student-list/student-list.component';
import { AddProfileComponent } from './core/back-office/User/add-profile/add-profile.component';
import { TwoWayFactorPageComponent } from './core/front-office/two-way-factor-page/two-way-factor-page.component';
import { FormateurListComponent } from './core/back-office/User/formateur-list/formateur-list.component';
import { UploadFileUserComponent } from './core/back-office/User/upload-file-user/upload-fileUser.component';
import { AddAdminComponent } from './core/back-office/User/add-admin/add-admin.component';
import { AddFormateurComponent } from './core/back-office/User/add-formateur/add-formateur.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseListComponent } from './cour/course-list/course-list.component';
import { AddCourseComponent } from './cour/add-course/add-course.component';
import { CourseDeleteComponent } from './cour/course-delete/course-delete.component';
import { CourseUpdateComponent } from './cour/course-update/course-update.component';
import { StripeComponent } from './cour/stripe/stripe.component';
import { AddRessourceComponent } from './cour/add-ressource/add-ressource.component';
import { RessourceListComponent } from './cour/ressource-list/ressource-list.component';
import { RessourceMaterialsComponent } from './cour/ressource-materials/ressource-materials.component';
import { ListComponent } from './cour/video/list/list.component';
import { VideoService } from './service/video.service';
import { ChatComponent } from './cour/chat/chat/chat.component';
import { FaculteListComponent } from './Faculte/faculte-list/faculte-list.component';
import { AddFaculteComponent } from './Faculte/add-faculte/add-faculte.component';
import { EditFaculteComponent } from './Faculte/edit-faculte/edit-faculte.component';
import { PoleListComponent } from './Pole/pole-list/pole-list.component';
import { AddPoleComponent } from './Pole/add-pole/add-pole.component';
import { UpdatePoleComponent } from './Pole/update-pole/update-pole.component';
import { PoleListFrontComponent } from './Pole/pole-list-front/pole-list-front.component';
import { FaculteListFrontComponent } from './Faculte/faculte-list-front/faculte-list-front.component';
import { CommonModule } from '@angular/common';

import { QuizListComponent } from './Quiz/quiz-list/quiz-list.component';
import { MakeQuizComponent } from './Quiz/make-quiz/make-quiz.component';
import { QuizResultsComponent } from './Quiz/quiz-results/quiz-results.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { CalendarClassComponent } from './calendar-class/calendar-class.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AddFicheModuleComponent } from './cour/add-fiche-module/add-fiche-module.component';
import { FilterPipe } from './pipes/filter.pipe';


import { RegisterComponent } from './core/front-office/Participant/register/register.component';
import { LoginParticipantComponent } from './core/front-office/Participant/login-participant/login-participant.component';

import { AddClassComponent } from './Class/add-class/add-class.component';
import { ClassListComponent } from './Class/class-list/class-list.component';
import { MessageService } from 'primeng/api';
import { ResetPasswordComponent } from './core/front-office/reset-password/reset-password.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { ChangePasswordComponent } from './core/back-office/User/change-password/change-password.component';
import { NotificationComponent } from './cour/notification/notification.component';

@NgModule({
  declarations: [
    SupportComponent,
    UpdateReclamationComponent,
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    QuestionListComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    DeleteQuestionComponent, 
    AddBlogComponent,
    ListBlogComponent,
    UserDashboardComponent,
    UploadFileComponent,
    UpdateBlogComponent,
    BlogDetailsComponent,
    BlogGridsComponent,
    NotFoundComponent,
    ServerErrorComponent,  
    LoginComponent,
    UploadFileUserComponent,
    RegisterComponent,
    EditProfileComponent,
    SideBarComponent,
    StudentListComponent,
    AdminListComponent,
    AddProfileComponent,
    TwoWayFactorPageComponent,
    FormateurListComponent,
    UploadFileComponent,
    AddAdminComponent,
    AddFormateurComponent,
    CourseListComponent,
    AddCourseComponent,
    CourseDeleteComponent,
    CourseUpdateComponent,
    StripeComponent,
    AddRessourceComponent,
    RessourceListComponent,
    RessourceMaterialsComponent,
    ListComponent,
    ChatComponent,
    PoleListComponent,
    AddPoleComponent,
    UpdatePoleComponent,
    ListDomaineComponent,
    AjoutDomaineComponent,
    DeleteDomaineComponent,
    UpdateDomaineComponent,
    PhotoComponent, 
    AddFaculteComponent, 
    FaculteListComponent,
    AddFaculteComponent,
    EditFaculteComponent,
    AddCommentaireComponent,
    ListeCommentaireComponent,
    ListReclamationComponent,
    LoginParticipantComponent,
    AddClassComponent,
    ClassListComponent,
    PoleListFrontComponent,
    FaculteListFrontComponent,    
    QuizListComponent,
    MakeQuizComponent,
    FilterPipe,
    QuizResultsComponent,
    LoginParticipantComponent,
    CalendarClassComponent,
    AddFicheModuleComponent,
    ResetPasswordComponent,
    VideoCallComponent,
    ChangePasswordComponent,
    NotificationComponent
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,      
    DialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    TooltipModule,
    ToolbarModule,
    PaginatorModule,
    BrowserAnimationsModule,
    ToastModule,
    CKEditorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,  
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    PickerModule
  ],
  providers: [BlogService,VideoService, ToastrService,MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
