import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ClassInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const token = 'your-token-here'; // Replace with actual token logic
            const modifiedReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('Authorization', `Bearer ${token}`)
            });
            return next.handle(modifiedReq);
    }

}