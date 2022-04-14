import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  user = new Subject<User>();

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0hM6XAM_qrKzlzNdSWvNQm_gljN7O5A',
        { email: email, password: password, returnSecureToken: true } // exact body data that's needed by firebase auth REST API signup endpoint
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd0hM6XAM_qrKzlzNdSWvNQm_gljN7O5A',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      // getTime() return Date in ms, expiresIn property is in s originally
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
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
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email address does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
