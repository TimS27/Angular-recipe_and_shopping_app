import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0hM6XAM_qrKzlzNdSWvNQm_gljN7O5A ',
        { email: email, password: password, returnSecureToken: true } // exact body data that's needed by firebase auth REST API signup endpoint
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured.';
          if (!errorRes.error || !errorRes.error.error) {
            // in case response has object has different structure
            return throwError(() => errorMessage);
          }
          switch (
            errorRes.error.error.message // expected response object structure
          ) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email is already in use.';
          }
          return throwError(() => errorMessage);
        })
      );
  }
}
