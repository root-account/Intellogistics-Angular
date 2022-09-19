import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/', title: 'Clear payment',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/', title: 'Send a Parcel',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/', title: 'Track Parcel',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/clear-payment', title: 'Clear Payment',  icon:'ni ni-check-bold', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
