import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

export const apiUrl: string = 'http://localhost:8080/api';

export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(withInterceptors([jwtInterceptor])),
      provideAnimationsAsync(),
      provideHttpClient(),
      DialogService,
      DynamicDialogRef,
      MessageService,
      ConfirmationService,
      providePrimeNG({
          theme: {
              preset: Aura
          }
      })
    ]
};
