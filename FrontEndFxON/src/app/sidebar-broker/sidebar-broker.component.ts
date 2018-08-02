import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard-broker', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: 'watchlist', title: 'Market Watch List',  icon: 'pe-7s-note2', class: '' },
    { path: 'history', title: 'Trade History',  icon: 'pe-7s-cash', class: '' },
    { path: 'client-details', title: 'Client Details',  icon: 'pe-7s-user', class: '' },
];



@Component({
  selector: 'app-sidebar-broker',
  templateUrl: './sidebar-broker.component.html',
})
export class SidebarBrokerComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }

}
