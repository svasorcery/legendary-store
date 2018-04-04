import { Component } from '@angular/core';

import { UserService } from '../user.service';
import { UserInfo } from '../app.models';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    userInfo: UserInfo;
    isExpanded = false;

    constructor(private _user: UserService) {}

    ngOnInit() {
        this._user.WhoAmI()
            .subscribe(
                result => this.userInfo = result,
                error => console.log(error)
            );
    }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}
