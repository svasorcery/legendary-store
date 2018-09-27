import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';

interface IBreadcrumb {
    label: string;
    params?: Params;
    url: string;
}


@Component({
    selector: 'breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
    @Input() visible: boolean = true;
    @Input() showHome: boolean = true;
    public breadcrumbs: IBreadcrumb[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit() {
        // subscribe to the NavigationEnd event
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                // set breadcrumbs
                const root: ActivatedRoute = this.activatedRoute.root;
                this.breadcrumbs = this.getBreadcrumbs(root);
            });
    }

    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
        const ROUTE_DATA_BREADCRUMB_KEY: string  = 'key';
        const ROUTE_DATA_BREADCRUMB_VALUES: string = 'values';

        // get the child routes
        const children: ActivatedRoute[] = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        // iterate over each children
        for (const child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get the route's URL segment
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            if (!routeURL || routeURL === '') {
                continue;
            }

            // append route URL to URL
            url += `/${routeURL}`;

            const key = child.snapshot.data[ROUTE_DATA_BREADCRUMB][ROUTE_DATA_BREADCRUMB_KEY];
            if (!child.snapshot.data[key]) {
                this.visible = false;
                return breadcrumbs;
            }

            const values = child.snapshot.data[ROUTE_DATA_BREADCRUMB][ROUTE_DATA_BREADCRUMB_VALUES];
            const label = values.map(value => value.includes('.') ?
                child.snapshot.data[key][value.split('.')[0]][value.split('.')[1]] :
                child.snapshot.data[key][value]
                ).join(' ');

            // add breadcrumb
            const breadcrumb: IBreadcrumb = {
                label: label,
                params: child.snapshot.params,
                url: url
            };

            breadcrumbs.push(breadcrumb);

            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }

        // we should never get here, but just in case
        return breadcrumbs;
    }
}
