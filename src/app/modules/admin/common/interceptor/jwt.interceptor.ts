import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtService} from "../../../common/service/jwt.service";
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(private  jwtService: JwtService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.jwtService.getToken();
    if (req.url.startsWith("/api/admin") && token) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
    }
    return next.handle(req);
  }

}
