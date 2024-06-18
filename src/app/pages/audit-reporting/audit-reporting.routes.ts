import { Routes } from '@angular/router';
import { AuditComponent } from './components/audit/audit.component';
import { ReportingComponent } from './components/reporting/reporting.component';

export const AUDITREPORTING_ROUTES: Routes = [
  { path: '', redirectTo: 'reporting', pathMatch:'full' },
  { path: 'reporting', component: ReportingComponent },
  { path: 'audit', component: AuditComponent },
];
