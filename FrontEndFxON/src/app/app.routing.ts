import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TradehistoryComponent } from './tradehistory/tradehistory.component';
import { OrdercreateComponent } from './ordercreate/ordercreate.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =[
    {path: 'dashboard', component: DashboardComponent },
    {path: 'user', component: UserComponent},
    {path: 'history', component: TradehistoryComponent},
    {path: 'order', component: OrdercreateComponent},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [
      CommonModule,
      BrowserModule,
      RouterModule.forRoot(routes)
    ],
    exports: [
    ],
  })
  export class AppRoutingModule { }