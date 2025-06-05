import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('ecommerce-token'));

  token$ = this.tokenSubject.asObservable();

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiURL}/auth/login`, {
      username, password
    }).pipe(
      tap(response => {
        localStorage.setItem('ecommerce-token', response.token);
        this.tokenSubject.next(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('ecommerce-token');
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }
}
