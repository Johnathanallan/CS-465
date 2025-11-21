import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable,Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../services/authentication';

// JWT Interceptor to add Authorization header to HTTP requests
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: Authentication
    ) {}

    // Intercept HTTP requests and add JWT token if available
    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    var isAuthAPI: boolean;

    // console.log('Interceptor::URL' + request.url);
    if(request.url.startsWith('login') ||
    request.url.startsWith('register')) {
    isAuthAPI = true;
    }
    else {
    isAuthAPI = false;
    }
    if(this.authenticationService.isLoggedIn() && !isAuthAPI) {
    let token = this.authenticationService.getToken();
    // console.log(token);
    const authReq = request.clone({
    setHeaders: {
    Authorization: `Bearer ${token}`
    }
    });
    return next.handle(authReq);
    }
    return next.handle(request);
    }
    }

    


