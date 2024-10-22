import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  emailErrorMessage: string | null = null;
  passwordErrorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.emailErrorMessage = null;
    this.passwordErrorMessage = null;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email && !this.password) {
      this.emailErrorMessage = 'Email is required';
      this.passwordErrorMessage = 'Password is required';
      return;
    }

    if (!emailPattern.test(this.email)) {
      this.emailErrorMessage = 'Invalid email format';
      return;
    }

    if (this.password.length < 6) {
      this.passwordErrorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.authService.register(this.email, this.password)
      .then(() => {
        this.router.navigate(['/auth/login']);
      })
      .catch(error => {
        this.passwordErrorMessage = error.message;
        console.log('Registration Error:', this.passwordErrorMessage);
      });
  }
}
