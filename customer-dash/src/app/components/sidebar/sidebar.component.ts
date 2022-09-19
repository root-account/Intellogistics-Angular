import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: '/new-quote', title: 'Send a parcel',  icon: 'ni ni-chart-bar-32', class: '' },
    // { path: '/new-collection', title: 'Send a Parcel',  icon: 'ni ni-delivery-fast', class: '' },
    { path: '/track', title: 'Track Parcel',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/clear-payment', title: 'Clear Payment',  icon:'ni-planet text-blue', class: '' },
];

// export const ROUTES_LOG_OUT: RouteInfo[] = [
//   { path: '/new-quote', title: 'Send a parcel',  icon: 'ni ni-chart-bar-32', class: '' },
//   { path: '/track', title: 'Track Parcel',  icon:'ni-pin-3 text-orange', class: '' },
//   // { path: '/clear-payment', title: 'Clear Payment',  icon:'ni-planet text-blue', class: '' },
// ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public isLoggedIn : boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });


  //  Check if logged in
  if(localStorage.getItem('userToken') != null){
    this.isLoggedIn = true;
  }else{
    this.isLoggedIn = false;
  }

  }

  logout(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');

    this.router.navigate(['/login']);
  }





}
