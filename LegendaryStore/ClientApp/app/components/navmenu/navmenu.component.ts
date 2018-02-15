import { Component, Inject, OnInit } from '@angular/core';

import { UserService } from '../../user.service';
import { UserInfo } from '../../app.models';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    userInfo: UserInfo;

    constructor(private _user: UserService) {}

    ngOnInit() {
        this._user.WhoAmI()
            .subscribe(
                result => this.userInfo = result,
                error => console.log(error)
            );
    }
}
