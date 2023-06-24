import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler):
        Observable<HttpEvent<any>> {

        // here we add token in the request
        let authReq = req;
        const token = this.login.getToken();

        if (token != null) {
            authReq = authReq.clone({ 
                setHeaders: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                                 },
             })
           
        }

        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];