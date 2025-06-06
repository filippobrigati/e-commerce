import { Component, inject } from '@angular/core';
import { Auth as AuthService } from '../../../core/service/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private service = inject(AuthService);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl('johnd', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('m38rmF$', [Validators.required, Validators.minLength(3)])
  });

  login() {
    try {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      if (!username || !password) {
        throw new Error('Missing values');
      }

      this.service.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          alert('Invalid credentials');
        }
      });
    } catch (error) {
      alert(`Error occurred: ${error instanceof Error ? error.message : error}`);
    }
  }
}
