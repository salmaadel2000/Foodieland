
import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailErrorMessage: string | null = null; 
  passwordErrorMessage: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.emailErrorMessage = null; 
    this.passwordErrorMessage = null; 

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!this.email && !this.password)
    {
      this.emailErrorMessage = 'Email is requrid';
      this.passwordErrorMessage = 'Password is requrid';
      return;
    }
    
    
    if (!emailPattern.test(this.email)) {
      this.emailErrorMessage = 'Invalid email format';
      return;
    }

    if (this.password.length < 6) {
      this.passwordErrorMessage = 'Password must be at least 6 characters long';
      console.log('Password error message set:', this.passwordErrorMessage); 
      return;
    }

    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/blank/fav-recipes']);
      })
      .catch(error => {
        this.passwordErrorMessage = error.message; 
        console.log('Login Error:', this.passwordErrorMessage);
      });
  }
}