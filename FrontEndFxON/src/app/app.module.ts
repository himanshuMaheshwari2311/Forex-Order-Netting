import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OrdercreateComponent } from './ordercreate/ordercreate.component';
import { TradehistoryComponent } from './tradehistory/tradehistory.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';

import {LoginService} from './login/login.service';
import { SidebarBrokerComponent } from './sidebar-broker/sidebar-broker.component';
import { DashboardBrokerComponent } from './dashboard-broker/dashboard-broker.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    UserComponent,
    WatchlistComponent,
    OrdercreateComponent,
    TradehistoryComponent,
    LoginComponent,
    SidebarBrokerComponent,
    DashboardBrokerComponent,
    ClientDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
