import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: 'order', title: 'Order Creation',  icon: 'pe-7s-browser', class: '' },
    { path: 'watchlist', title: 'Market Watch List',  icon: 'pe-7s-note2', class: '' },
    { path: 'history', title: 'Trade History',  icon: 'pe-7s-cash', class: '' },
    { path: 'user', title: 'Profile',  icon: 'pe-7s-user', class: '' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
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
  };
}
