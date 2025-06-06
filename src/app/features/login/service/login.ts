import { inject, Injectable } from '@angular/core';
import { Auth } from '../../../core/service/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class Login {
  private auth = inject(Auth);

  /**
   * Call login action
   * 
   * @param username the user username
   * @param password the user password
   * @returns 
   */
  login(username: string, password: string) {
    return this.auth.login(username, password);
  }
}
