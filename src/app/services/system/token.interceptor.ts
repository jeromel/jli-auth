import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authService: OAuthService;

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.debug('intercept:');
        if (this.getAuthService().hasValidAccessToken()) {
            console.debug('intercept:auth');
            request = request.clone({
                setHeaders: {
                    Authorization: this.getAuthService().authorizationHeader()
                },
            });
        }

        return next.handle(request);
    }

    getAuthService(): OAuthService {
        if (typeof this.authService === 'undefined') {
            this.authService = this.injector.get(OAuthService);
        }
        return this.authService;
    }
}