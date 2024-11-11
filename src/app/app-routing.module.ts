import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AgencyFormComponent } from './agency-form/agency-form.component';
import { MainComponent } from './main/main.component';
import { BranchManagerRecordTableComponent } from './branch-manager-record-table/branch-manager-record-table.component';
import { UserRegisersComponent } from './user-regisers/user-regisers.component';
import { CouRecordsComponent } from './cou-records/cou-records.component';
import { CouHistoriesComponent } from './cou-histories/cou-histories.component';
import { CouSingletransitionComponent } from './cou-singletransition/cou-singletransition.component';
import { SttmCustAccountsComponent } from './sttm-cust-accounts/sttm-cust-accounts.component';
import { CatmCheckDetailsComponent } from './catm-check-details/catm-check-details.component';
import { PtipInsIssueTxnComponent } from './ptip-ins-issue-txn/ptip-ins-issue-txn.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cou-singlerecourd', component: CouSingletransitionComponent },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainComponent },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        outlet: 'mainContent',
      },
      {
        path: 'transition-create',
        component: AgencyFormComponent,
        outlet: 'mainContent',
      },
      {
        path: 'branchmanager-record',
        component: BranchManagerRecordTableComponent,
        outlet: 'mainContent',
      },
      {
        path: 'register-upload',
        component: UserRegisersComponent,
        outlet: 'mainContent',
      },
      {
        path: 'cou-records',
        component: CouRecordsComponent,
        outlet: 'mainContent',
      },
      {
        path: 'cou-histories',
        component: CouHistoriesComponent,
        outlet: 'mainContent',
      },
      {
        path: 'sttm-cust-account',
        component: SttmCustAccountsComponent,
        outlet: 'mainContent',
      },
      {
        path: 'catm-check-detail',
        component: CatmCheckDetailsComponent,
        outlet: 'mainContent',
      },
      {
        path: 'pipt-ins-issue',
        component: PtipInsIssueTxnComponent,
        outlet: 'mainContent',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
