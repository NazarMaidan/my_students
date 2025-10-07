import { ApplicationConfig } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyDhlvF3UsGhX9X70825Pg079MNskIAzK0s",
  authDomain: "my-students-derevnia.firebaseapp.com",
  projectId: "my-students-derevnia",
  storageBucket: "my-students-derevnia.firebasestorage.app",
  messagingSenderId: "573984367900",
  appId: "1:573984367900:web:b9a15163b44f94134946d9"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
