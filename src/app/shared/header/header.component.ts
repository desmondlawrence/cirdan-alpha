import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from '../models/breadcrumb.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: string[];
  breadcrumbs: Breadcrumb[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.menuItems = [];
    this.breadcrumbs = [];
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute);
      }
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      /* tslint:disable:no-string-literal */
      const label = child.snapshot.data['breadcrumb'];
      /* tslint:enable:no-string-literal */
      if ((label)) {
        breadcrumbs.push(new Breadcrumb(label, url));
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return [];
  }

}

