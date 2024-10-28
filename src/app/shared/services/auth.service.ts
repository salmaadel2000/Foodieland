
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const token = userCredential.user.uid; 
      localStorage.setItem('token', token); 
      localStorage.setItem('favorites',JSON.stringify([]));
      this.router.navigate(['/blank/fav-recipes']);
      return null;
    } catch (err) {
      console.error('Login Error:', this.getErrorMessage(err));
      return this.getErrorMessage(err); 
    }
  }

  async register(email: string, password: string): Promise<string | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const token = userCredential.user.uid; 
      localStorage.setItem('token', token); 
      this.router.navigate(['/auth/login']);
      return null; 
    } catch (err) {
      console.error('Registration Error:', this.getErrorMessage(err));
      return this.getErrorMessage(err); 
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      localStorage.clear()
      this.router.navigate(['/auth/login']);
    } catch (err) {
      console.error('Logout Error:', this.getErrorMessage(err));
    }
  }

  private getErrorMessage(err: unknown): string {
    if (err instanceof Error) {
      return err.message; 
    }
    return 'An unknown error occurred.';
  }
}
