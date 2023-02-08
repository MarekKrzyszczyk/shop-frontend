import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {JwtService} from "../service/jwt.service";

@Injectable()
export class ProfileAuthorizeGuard implements CanActivate {

  constructor(private jwtService: JwtService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = this.jwtService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(["/login"]);
    }
    return true;
  }

}
