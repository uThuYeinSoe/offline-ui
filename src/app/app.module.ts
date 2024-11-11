import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { LayoutComponent } from './layout/layout.component';
import { BranchManagerRecordTableComponent } from './branch-manager-record-table/branch-manager-record-table.component';
import { SuperAdminSidenavComponent } from './super-admin-sidenav/super-admin-sidenav.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgencyFormComponent } from './agency-form/agency-form.component';
import { UserRegisersComponent } from './user-regisers/user-regisers.component';
import { CouRecordsComponent } from './cou-records/cou-records.component';
import { CouHistoriesComponent } from './cou-histories/cou-histories.component';
import { CouSingletransitionComponent } from './cou-singletransition/cou-singletransition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { SttmCustAccountsComponent } from './sttm-cust-accounts/sttm-cust-accounts.component';
import { CatmCheckDetailsComponent } from './catm-check-details/catm-check-details.component';
import { PtipInsIssueTxnComponent } from './ptip-ins-issue-txn/ptip-ins-issue-txn.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FilterModule } from './filter/filter.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    LayoutComponent,
    BranchManagerRecordTableComponent,
    SuperAdminSidenavComponent,
    AdminSidenavComponent,
    UserSidenavComponent,
    ContactUsComponent,
    AgencyFormComponent,
    UserRegisersComponent,
    CouRecordsComponent,
    CouHistoriesComponent,
    CouSingletransitionComponent,
    SttmCustAccountsComponent,
    CatmCheckDetailsComponent,
    PtipInsIssueTxnComponent,
    UserinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FilterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
