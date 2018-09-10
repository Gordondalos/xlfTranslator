Полная перезагрузка страницы

        const {getCurrentWindow, globalShortcut} = require('electron').remote;

        getCurrentWindow().reload();
        
        
Меюшка

    npm install ngx-electron --save

then, use the code as follow

    import { ElectronService } from 'ngx-electron';
    import { Component, OnInit } from '@angular/core';
    import { Router } from '@angular/router'; 


    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.css']
    })
    export class HomeComponent implements OnInit {
     
      constructor(private _electronService: ElectronService,private router: Router) {  
        this.initMenu();
      }
    
      ngOnInit() {
     

    }
 
    private initMenu() {
      let menu = this._electronService.remote.Menu.getApplicationMenu();

      let pageMenu  = new this._electronService.remote.MenuItem(
        {
          label: 'Page',
              submenu: [
                  { label: 'Page 1', click: () => this.router.navigate(['/page1']) },
                  { label: 'Page 2', click: () => this.router.navigate(['/page']) },
              ],
        }
      );

      menu.insert(1, pageMenu);

      this._electronService.remote.Menu.setApplicationMenu(menu);
  
    }
}