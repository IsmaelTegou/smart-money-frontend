import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {apiUrl} from '@/app.config';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  let jwtToken: string | null = localStorage.getItem('access_token');
  if (
    jwtToken &&
    !req.url.startsWith(`${apiUrl}/auth`)
  ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }
  return next(req);
};
