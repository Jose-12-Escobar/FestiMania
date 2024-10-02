import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from 'src/app/Services/header.service';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  scroll!: boolean;
  show:boolean = false;
  inFestival : boolean = false;

  constructor(private _showHD: HeaderService,
              private _router: Router,
              public _showSB: SidebarService,
              public _authService: AuthService,) {
    this._showHD.showHeader.subscribe( res => { this.scroll = res});
  }

  toggleCollapse(): void {
    this.show = !this.show
  }

  ngOnInit(): void {
    this._router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        const splitPath = this._router.url.split('/');
        if (splitPath[1] != "home") {
          this._showHD.changeShowHeader(true)
          if (splitPath[1] === "festival") {
            this.inFestival = true;
          }
          else{
            this.inFestival = false;
          }
        }else{
          this._showHD.changeShowHeader(false);
          this.inFestival = false;
        }
      }
    });
  }

  hiddenSidebar() {
    this._showSB.changeShowSidebar(!this._showSB.showSidebar.value);
  }

  logout(){
    this._router.navigate(['/auth/login'])
  }

}
